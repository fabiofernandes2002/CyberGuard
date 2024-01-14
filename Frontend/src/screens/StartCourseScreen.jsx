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
import MenuHamburguer from '../components/Menu';
import Star from '../assets/star.svg';
import CoursesService from '../services/courses.services';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import YouTube from 'react-native-youtube';

const CoursesDetailsScreen = ({route}) => {
  const {courseId} = route.params;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await CoursesService.getAllCourses();
        console.log('Courses:', coursesData);
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const course = courses.find(course => course._id === courseId);
  if (!course) {
    return null;
  }

  const navigation = useNavigation();

  // Função para extrair o ID do vídeo do YouTube a partir da URL
  const extractYouTubeId = url => {
    console.log('url:', url);
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
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
            <Text style={Styles.title}>{course.nameCourse}</Text>
            <View>
              <View style={Styles.card}>
                <View style={Styles.cardImage}>
                  <View style={Styles.imageCourse}>
                    <Image style={Styles.imageCourse} source={{uri: course.imgURL}} />
                  </View>
                </View>
                <View style={Styles.titleRating}>
                  <Text style={Styles.courseTitle}>Categorias de Malware</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <Text style={Styles.courseRating}>({course.rating})</Text> */}
                  </View>
                </View>
                <View>
                  {/* View para flatlist para renderizar os videos do curso */}
                  <View style={Styles.containerVideos}>
                  <YouTube
                  videoId="LSUwfF9lvgw" // ID do vídeo do YouTube
                  play // controla a reprodução do vídeo
                  fullscreen // controla se o vídeo preenche a tela
                  loop // controla se o vídeo deve fazer loop
                  style={Styles.video}
                  onError={e => console.log(e)} // Callback para erros
                />
                <YouTube
  videoId="LSUwfF9lvgw" // The YouTube video ID
  play // control playback of video with true/false
  fullscreen // control whether the video should play in fullscreen or inline
  loop // control whether the video should loop when ended
  onReady={e => this.setState({ isReady: true })}
  onChangeState={e => this.setState({ status: e.state })}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
  style={{ alignSelf: 'stretch', height: 300 }}
/>

                  </View>
                  <View style={Styles.button}>
                    <Text style={Styles.buttonText}>Começar curso</Text>
                  </View>
                </View>
              </View>
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
  imageCourse: {
    alignSelf: 'center',
    width: 260,
    height: 236,
    borderRadius: 10,
    marginBottom: 30,
    padding: 20,
  },
  titleRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  textDescription: {
    fontFamily: 'Raleway-Regular',
    fontSize: 17,
    color: '#1B1B1E',
    marginTop: 20,
  },
  courseTitle: {
    fontFamily: 'Supply-Bold',
    fontSize: 17,
    color: '#1B1B1E',
    marginRight: 10,
  },
  courseRating: {
    fontFamily: 'Supply-Medium',
    fontSize: 15,
    color: '#1B1B1E',
    marginRight: -10,
  },
  card: {
    width: '80%',
    marginBottom: 50,
  },
  cardTitle: {
    fontFamily: 'Supply-Medium',
    fontSize: 15,
    color: '#f7f7f7',
    marginTop: 10,
  },
  cardPrice: {
    fontFamily: 'Supply-Bold',
    fontSize: 17,
    color: '#6E0271',
    marginTop: 20,
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
  cardImage: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1B1B1E',
    width: 315,
    height: 288
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
    marginTop: 20
  },
});

export default CoursesDetailsScreen;
