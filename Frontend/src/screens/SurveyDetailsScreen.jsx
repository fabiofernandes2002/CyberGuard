import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Radio} from 'native-base';
import {ProgressBar} from 'react-native-paper';
import {Center, Box, Progress} from 'native-base';
import surveyData from '../data/Survey.json';
import Seta from '../assets/setaButton.svg';
import {useNavigation} from '@react-navigation/native';

const SurveyDetailsScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);

  const totalQuestions = surveyData.surveys.length;

  const progress = (currentQuestionNumber / totalQuestions) * 100;

  const survey = surveyData.surveys[currentQuestionNumber - 1].surveyInfo;

  const responses = [
    ...survey.incorrectAnswers.map((answer, index) => ({
      id: `${index + 1}`,
      text: answer,
    })),
    {id: `${survey.incorrectAnswers.length + 1}`, text: survey.correctAnswer},
  ];

  // Quando o usuário selecionar uma resposta, verifique se a resposta está correta e atualize a pontuação
  const handleOptionChange = value => {
    setSelectedOption(value);
    if (responses[value - 1].text === survey.correctAnswer) {
      setScore(score + 1);
    }
  };

  const navigation = useNavigation();
  const handleButtonTerminarPress = () => {
    navigation.navigate('SurveyResultScreen', {score});
  };

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={Styles.container}>
      <View style={Styles.content}>
        {/* Número da questão */}
        <Text style={Styles.questionNumber}>
          {currentQuestionNumber}/{totalQuestions}
        </Text>
        {/* Barra do progresso das perguntas */}
        {/* <View style={Styles.progressBar}>
                    <ProgressBar progress={progress} color="#00428A" style={Styles.progressBar} />
                </View> */}
        <View style={Styles.progressBar}>
          <Center w="100%">
            <Box w="90%" maxW="400">
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
            if (currentQuestionNumber < totalQuestions) {
              setCurrentQuestionNumber(currentQuestionNumber + 1);
              setSelectedOption(null);
            } else {
              handleButtonTerminarPress();
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7.5,
    marginTop: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#F7F7F7',
    fontSize: 17,
    fontFamily: 'Supply-Bold',
    textAlign: 'center',
  },
});

export default SurveyDetailsScreen;
