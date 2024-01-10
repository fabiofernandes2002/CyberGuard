import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import SetaEsquerda from '../assets/SetaEsquerda.svg';
import MenuHamburguer from '../components/Menu';
import Star from '../assets/star.svg';

const courses = [
    {
        id: '1',
        name: 'Direitos Individuais',
        image: require('../assets/course1.png'),
        price: '20.99€',
        rating: 120,
        description: 'Explora os fundamentos dos direitos individuais no nosso curso. Capacita-te na compreensão e defesa dos teus direitos online.'
    },
    {
        id: '2',
        name: 'Malware',
        image: require('../assets/course2.png'),
        price: false,
        rating: 120,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Sed vitae eros quis nisl aliquam aliquet.'
    },
    {
        id: '3',
        name: 'Proteção de Dados',
        image: require('../assets/course3.png'),
        price: '20.99€',
        rating: 120,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Sed vitae eros quis nisl aliquam aliquet.'
    },
    {
        id: '4',
        name: 'Marketing Digital Ético',
        image: require('../assets/course4.png'),
        price: '20.99€',
        rating: 120,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Sed vitae eros quis nisl aliquam aliquet.'
    }
];

const CoursesDetailsScreen = ({ route }) => {

    const { courseId } = route.params;
    const course = courses.find(course => course.id === courseId);

    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={Styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <View style={Styles.Menu}>
                        {/* Back button */}
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <SetaEsquerda
                                width={30}
                                height={30}
                                style={Styles.icon}
                            />
                        </TouchableOpacity>
                        {/* Menu hamburguer */}
                        <MenuHamburguer />
                    </View>
                    <View style={Styles.container2}>
                        <Text style={Styles.title}>Privavcidade de Dados</Text>
                        <View>
                            <View style={Styles.card}>
                                <Image style={Styles.imageCourse} source={course.image} />
                                <View style={Styles.titleRating}>
                                    <Text style={Styles.courseTitle}>{course.name.replace(' ', '\n')}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Star width={25} height={25} style={{ marginRight: 10 }} />
                                        <Text style={Styles.courseRating}>({course.rating})</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={Styles.cardPrice}>{course.price === false ? 'FREE' : course.price}</Text>
                                    <Text style={Styles.textDescription}>{course.description}</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={[Styles.button, { backgroundColor: course.price ? '#00428A' : '#6E0271' }]}>
                                    <Text style={Styles.buttonText}>{course.price ? 'Comprar curso' : 'Começar curso'}</Text>
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
        marginBottom: 20,
    },
    imageCourse: {
        alignSelf: 'center',
        width: 315,
        height: 288,
        borderRadius: 10,
        marginBottom: 10,
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
});

export default CoursesDetailsScreen;