import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import MenuHamburguer from '../components/Menu';
import faqsData from '../data/Faqs.json';

const FaqsScreen = () => {
    const navigation = useNavigation();
    const faqs = faqsData.faqs

    const [showAnswers, setShowAnswers] = useState(Array(faqs.length).fill(false));

    const toggleAnswer = (index) => {
        const newShowAnswers = [...showAnswers];
        newShowAnswers[index] = !newShowAnswers[index];
        setShowAnswers(newShowAnswers);
    };

    return (
        <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={styles.container}>
            <View>
                <View style={styles.Menu}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/logo_semfundo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View>
                            <Text style={styles.textC}>Cyber</Text>
                            <Text style={styles.textG}>Guard</Text>
                        </View>
                    </TouchableOpacity>
                    <NativeBaseProvider>
                        <MenuHamburguer />
                    </NativeBaseProvider>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>FAQ's</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {faqs.map((faq, index) => (
                        <View key={index} style={styles.faqContainer}>
                            <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.questionContainer}>
                                <Text style={styles.plusMinus}>{showAnswers[index] ? '-' : '+'}</Text>
                                <Text style={styles.faqQuestion}>{faq[`faq${index + 1}`].question}</Text>
                            </TouchableOpacity>
                            {showAnswers[index] && <Text style={styles.faqAnswer}>{faq[`faq${index + 1}`].answer}</Text>}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    logo: {
        position: 'absolute',
        width: 70,
        height: 70,
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
        marginLeft: 55,
        justifyContent: 'center',
        marginTop: -5,
    },
    textG: {
        fontFamily: 'Supply-Bold',
        fontSize: 20,
        color: '#00428A',
        marginLeft: 55,
        justifyContent: 'center',
        marginTop: -5,
    },
    Menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Supply-Bold',
        fontSize: 24,
        color: '#6E0271',
        marginTop: 50,
        marginBottom: 20,
        marginLeft: -285,
    },
    faqContainer: {
        marginBottom: 16,
    },
    questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    faqQuestion: {
        fontFamily: 'Supply-Bold',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: '#1b1b1e'
    },
    plusMinus: {
        color: '#6E0271',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        alignSelf: 'flex-start'
    },
    faqAnswer: {
        fontFamily: 'Raleway',
        fontSize: 15,
        fontWeight: 'regular',
        color: '#1b1b1e'
    },
});

export default FaqsScreen;