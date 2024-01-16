import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SetaEsquerda from '../assets/SetaEsquerda.svg';
import {Radio} from 'native-base';
import {Center, Box, Progress} from 'native-base';
import Seta from '../assets/setaButton.svg';
import MenuHamburguer from '../components/Menu';
import CoursesService from '../services/courses.services';
import UsersService from '../services/users.services';

const EvaluationScreen = ({route}) => {
  const {courseId} = route.params;
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentEvaluation, setCurrentEvaluation] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await CoursesService.getAllCourses();
        console.log('Courses:', coursesData);
        setCourses(coursesData);

        const courseData = coursesData.find(course => course._id === courseId);
        setCurrentCourse(courseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  

  useEffect(() => {
    if (currentCourse && currentQuestionNumber > currentCourse.evaluations[currentEvaluation].questions.length) {
      setCurrentQuestionNumber(1);
      if (currentEvaluation >= currentCourse.evaluations.length - 1) {
        setCurrentEvaluation(0);
      } else {
        setCurrentEvaluation(currentEvaluation + 1);
      }
    }
  }, [currentQuestionNumber, currentEvaluation, currentCourse]);

  if (!currentCourse) {
    return null;
  }

  const totalQuestions = currentCourse.evaluations.length;
  const progress = (currentQuestionNumber / totalQuestions) * 100;
  const survey = currentCourse.evaluations[currentEvaluation].questions[currentQuestionNumber - 1];

  if (!survey) {
    console.error('Question does not exist');
    return null;
  }

  const responses = [
    ...survey.answers.map((answer, index) => ({
      id: `${index + 1}`,
      text: answer,
    })),
  ];

  // Quando o usuário selecionar uma resposta, verifique se a resposta está correta e atualize a pontuação
  const handleOptionChange = value => {
    setSelectedOption(value);
    if (responses[value - 1].text === survey.correctAnswer) {
      setScore(score + 1);
    }
    setAnswers([...answers, { questionIndex: currentQuestionNumber - 1, answer: value }]);
  };

  const handleButtonTerminarPress = async () => {
    if (selectedOption !== null) {
      await UsersService.submitSurvey({ answers, score });
      navigation.navigate('SurveyResultScreen', {score});
    } else {
      alert('Por favor, selecione uma opção antes de terminar a pesquisa.');
    }
  };


  const course = courses.find(course => course._id === courseId);
  if (!course) {
    return null;
  }


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
                <Text style={Styles.title}>{course.nameCourse}</Text>
            </View>
            <View style={Styles.card}>
                <Image style={Styles.imageCourse} source={{uri: course.imgURL}} />
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
                                selectedOption === item.id ? '#487281' : '#D9D9D9',
                                borderColor:
                                selectedOption === item.id ? '#D9D9D9' : '#487281',
                            },
                            ]}>
                            <Text
                            style={{
                                color:
                                selectedOption === item.id ? '#f7f7f7' : '#1B1B1E',
                            }}>
                            {item.text}
                            </Text>
                        </View>
                        </Radio>
                    </View>
                    )}
                />
                </Radio.Group>
                <TouchableOpacity
                onPress={() => {
                    if (selectedOption !== null) {
                      setCurrentQuestionNumber(prevQuestionNumber => {
                        if (prevQuestionNumber < totalQuestions) {
                          setSelectedOption(null);
                          return prevQuestionNumber + 1;
                        } else {
                          handleButtonTerminarPress();
                          return prevQuestionNumber;
                        }
                      });
                    } else {
                      alert('Por favor, selecione uma opção antes de prosseguir.');
                    }
                  }}>
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
  },
});

export default EvaluationScreen;
