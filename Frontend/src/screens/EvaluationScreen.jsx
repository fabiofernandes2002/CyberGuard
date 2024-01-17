import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SetaEsquerda from '../assets/SetaEsquerda.svg';
import {Radio} from 'native-base';
import {Center, Box, Progress} from 'native-base';
import Seta from '../assets/setaButton.svg';
import MenuHamburguer from '../components/Menu';
import CoursesService from '../services/courses.services';

const EvaluationScreen = ({route}) => {
  const {courseId} = route.params;
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(new Array(totalQuestions).fill(-1));
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await CoursesService.getAllCourses();
        setCourses(coursesData);
        const courseData = coursesData.find(course => course._id === courseId);
        setCurrentCourse(courseData);
  
        // Inicializa 'answers' com base no número de perguntas do curso
        if (courseData) {
          const totalQuestions = courseData.evaluations
            .flatMap(evaluation => evaluation.questions)
            .length;
          setAnswers(new Array(totalQuestions).fill(-1));
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCourses();
  }, [courseId]); // Adiciona 'courseId' como dependência para reagir às mudanças
  
  useEffect(() => {
    // Verificar se allQuestions está definido e não está vazio
    if (allQuestions && allQuestions.length > 0) {
      // Calcular a pontuação com base nas respostas
      const newScore = answers.reduce((total, answerIndex, questionIndex) => {
        const question = allQuestions[questionIndex];
        if (question) {
          // Verificar se a resposta do usuário é a mesma que a resposta correta
          return total + (answerIndex === question.correctAnswerIndex ? 1 : 0);
        } else {
          return total;
        }
      }, 0);
  
      setScore(newScore);
    }
  }, [answers, allQuestions]);

  if (!currentCourse) {
    return null;
  }

  const allQuestions = currentCourse.evaluations.flatMap(
    evaluation => evaluation.questions,
  );
  const totalQuestions = allQuestions.length;
  const progress = (currentQuestionNumber / totalQuestions) * 100;
  const survey = allQuestions[currentQuestionNumber - 1];

  if (!survey) {
    console.error('Question does not exist');
    return null;
  }

  const responses = survey.answers.map((answer, index) => ({
    id: `${index + 1}`,
    text: answer,
  }));

  const handleOptionChange = value => {
    setSelectedOption(value);
    const questionIndex = currentQuestionNumber - 1;
    const answerIndex = parseInt(value) - 1; // Ajuste para que '1' seja '0', '2' seja '1', etc.
  
    // Atualizar o array de respostas
    let updatedAnswers = [...answers];
    if (updatedAnswers.length <= questionIndex) {
      updatedAnswers = [...updatedAnswers, ...new Array(questionIndex - updatedAnswers.length + 1).fill(-1)];
    }
    updatedAnswers[questionIndex] = answerIndex;
    setAnswers(updatedAnswers);
  
    // Obter a pergunta atual e a resposta correta
    const currentQuestion = allQuestions[questionIndex];
    const correctAnswerIndex = currentQuestion.correctAnswerIndex;
  
    // Verificar se a resposta do usuário é a correta
    if (answerIndex === correctAnswerIndex) {
      setScore(score + 1);
    }
  };
  
  

  const handleButtonTerminarPress = async () => {
    if (currentQuestionNumber === totalQuestions) {
      try {
        console.log('Enviando respostas:', answers);
        const result = await CoursesService.finishCourseById(courseId, answers);
        console.log('Curso finalizado com sucesso:', result);
        console.log('Score:', result.evaluationScore);
        navigation.navigate('ResultEvaluationScreen', {
          score: result.evaluationScore,
        });
      } catch (error) {
        console.error('Erro ao finalizar o curso:', error);
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionNumber < totalQuestions) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setSelectedOption(null);
    } else {
      handleButtonTerminarPress();
    }
  };

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={Styles.Menu}>
            {/* Back button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SetaEsquerda width={30} height={30} style={Styles.icon} />
            </TouchableOpacity>
            {/* Menu hamburguer */}
            <MenuHamburguer />
          </View>
          <View style={Styles.container2}>
            <Text style={Styles.title}>{currentCourse.nameCourse}</Text>
          </View>
          <View style={Styles.card}>
            <Image
              style={Styles.imageCourse}
              source={{uri: currentCourse.imgURL}}
            />
          </View>
          <View style={Styles.container2}>
            <View style={Styles.content}>
              {/* Número da questão */}
              <Text style={Styles.questionNumber}>
                {currentQuestionNumber}/{totalQuestions}
              </Text>
              <View style={Styles.progressBar}>
                <Center w="100%">
                  <Box w="100%" maxW="400">
                    <Progress
                      value={progress}
                      size="lg"
                      mx="4"
                      colorScheme="cyan"
                      bg="#D8DBE2"
                    />
                  </Box>
                </Center>
              </View>
              {/* Titulo da pergunta */}
              <View style={Styles.questionTitle}>
                <Text style={Styles.questionTitle}>{survey.question}</Text>
              </View>
              <Radio.Group
                key={currentQuestionNumber}
                name="exampleGroup"
                colorScheme="success"
                accessibilityLabel="pick an option"
                onChange={handleOptionChange}>
                <FlatList
                  data={responses}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <View style={Styles.radioContainer}>
                      <Radio colorScheme="success" value={item.id} my={1}>
                        <View
                          style={[
                            Styles.flatlistContiner,
                            {
                              backgroundColor:
                                selectedOption === item.id
                                  ? '#487281'
                                  : '#D9D9D9',
                              borderColor:
                                selectedOption === item.id
                                  ? '#D9D9D9'
                                  : '#487281',
                            },
                          ]}>
                          <Text
                            style={{
                              color:
                                selectedOption === item.id
                                  ? '#f7f7f7'
                                  : '#1B1B1E',
                            }}>
                            {item.text}
                          </Text>
                        </View>
                      </Radio>
                    </View>
                  )}
                />
              </Radio.Group>
              <TouchableOpacity onPress={handleNextQuestion}>
                <View
                  style={[
                    Styles.button,
                    {
                      backgroundColor:
                        currentQuestionNumber < totalQuestions
                          ? '#00428A'
                          : '#6E0271',
                    },
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={Styles.buttonText}>
                      {currentQuestionNumber < totalQuestions
                        ? 'Próximo'
                        : 'Terminar'}
                    </Text>
                    <Seta width={20} height={20} style={{marginLeft: 10}} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  logo: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    marginTop: 10,
  },
  textC: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 35,
    justifyContent: 'center',
  },
  textG: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 35,
    justifyContent: 'center',
  },
  container2: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Supply-Bold',
    fontSize: 24,
    color: '#6E0271',
    marginBottom: 30,
    marginTop: 50,
  },
  card: {
    width: '100%',
  },
  imageCourse: {
    alignSelf: 'center',
    width: 260,
    height: 236,
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
  },
  button: {
    backgroundColor: '#6E0271',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7.5,
    marginTop: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#F7F7F7',
    fontSize: 17,
    fontFamily: 'Supply-Bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  flatlistContiner: {
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    borderColor: '#487281',
    borderWidth: 5,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    width: 300,
    height: 80,
  },
  progressBar: {
    width: '100%',
    height: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 5,
  },
  questionNumber: {
    fontFamily: 'Supply-Bold',
    fontSize: 17,
    color: '#1B1B1E',
    marginBottom: 10,
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  questionTitle: {
    fontSize: 17,
    fontFamily: 'Supply-Bold',
    color: '#1B1B1E',
    marginBottom: 10,
    marginLeft: 25,
  },
});

export default EvaluationScreen;
