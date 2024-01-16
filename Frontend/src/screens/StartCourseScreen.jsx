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
import Star from '../assets/StarAvaliacao.svg';
import Coracao from '../assets/Coração.svg';
import Play from '../assets/Play.svg';
import CoursesService from '../services/courses.services';
import YoutubePlayer from "react-native-youtube-iframe";

const CoursesDetailsScreen = ({route}) => {
  const {courseId} = route.params;
  const [courses, setCourses] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [viewedVideos, setViewedVideos] = useState([]);

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

  const handleButtonStartEvaluationPress = () => {
    navigation.navigate('EvaluationScreen', {courseId: course._id});
  };


  // Função para extrair o ID do vídeo do YouTube a partir da URL
  const extractYouTubeId = url => {
    if (typeof url !== 'string') return null;
  
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleVideoPress = (videoId) => {
    setSelectedVideoId(extractYouTubeId(videoId));
    if (!viewedVideos.includes(videoId)) {
      setViewedVideos([...viewedVideos, videoId]);
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
            <Text style={Styles.title}>{course.nameCourse}</Text>
            <View>
              <View style={Styles.card}>
              <View style={Styles.cardImage}>
                  <View style={{ 
                    flex: 1, 
                    marginTop: selectedVideoId ? 100 : 30,
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    {selectedVideoId ? (
                      <YoutubePlayer
                        height={266}
                        width={288}
                        play={playing}
                        videoId={selectedVideoId}
                      />
                    ) : (
                      <View>
                        <Image style={Styles.imageCourse} source={{uri: course.imgURL}} />
                        <Play width={70} height={78} style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -50 }, { translateY: -50 }] }} />
                      </View>
                    )}
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
                  <FlatList
                    data={course.videos}
                    nestedScrollEnabled
                    keyExtractor={(item) => item.videoURL}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => handleVideoPress(item.videoURL)}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#E70D79' }}>
                          <View style={{ position: 'relative' }}>
                            <Image style={Styles.imgVideo} source={{uri: course.imgURL}} />
                            <Play width={35} height={35} style={{ position: 'absolute', top: '40%', left: '50%', transform: [{ translateX: -17.5 }, { translateY: -17.5 }] }} />
                          </View>
                            <View>
                              <Text style={Styles.videoTitle}>{item.title}</Text>
                              <Text style={Styles.videoDuration}>{Math.floor(item.duration / 60)}:{item.duration % 60}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                  </View>
                  <Text style={Styles.courseRating}>Avaliação do curso</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} width={35} height={35} style={{marginRight: 10}} />
                    ))}
                    <Coracao width={30} height={30} style={{marginLeft: 40}} />
                  </View>
                  <View style={Styles.button}>
                    <TouchableOpacity 
                      disabled={course.videos.length !== viewedVideos.length} 
                      style={course.videos.length !== viewedVideos.length ? { opacity: 0.5 } : {}}
                      onPress={handleButtonStartEvaluationPress}
                    >
                      <Text style={[Styles.buttonText, course.videos.length !== viewedVideos.length ? { opacity: 0.5 } : {}]}>Começar Teste</Text>
                    </TouchableOpacity>
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
    marginTop: 30,
    marginBottom: 30,
  },
  textDescription: {
    fontFamily: 'Raleway-Regular',
    fontSize: 17,
    color: '#1B1B1E',
    marginTop: 20,
  },
  courseTitle: {
    fontFamily: 'Supply-Bold',
    fontSize: 18,
    color: '#1B1B1E',
    marginRight: 10,
  },
  videoTitle: {
    fontFamily: 'Supply-Bold',
    fontSize: 15,
    color: '#1B1B1E',
    marginRight: 10,
    marginTop: -20,
    marginVertical: 10,
  },
  videoDuration: {
    fontFamily: 'Supply-Regular',
    fontSize: 15,
    color: '#1B1B1E',
    marginRight: 10,
  },
  courseRating: {
    fontFamily: 'Supply-Bold',
    fontSize: 18,
    color: '#1B1B1E',
    marginRight: -10,
    marginTop: 50,
    marginBottom: 20,
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
  imgVideo: {
    width: 100,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,
  },
});

export default CoursesDetailsScreen;
