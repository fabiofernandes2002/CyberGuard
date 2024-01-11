import React from 'react';
import { Text, View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SurveyIntroScreen = () => {
    
        const navigation = useNavigation();
        const handleButtonComecarPress = () => {
            navigation.navigate('SurveyDetailsScreen');
        }
    
    return (
        <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={Styles.container}>
            <View>
                {/* Logo */}
                <View style={Styles.LogoSurvey}>
                    <Image
                        source={require('../assets/logo_semfundo.png')}
                        style={Styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={Styles.SurveyText}>Avaliação de segurança</Text>
                </View>
                {/* Texto de introdução ao Survey */}
                <View style={Styles.text}>
                    <Text style={Styles.text}>
                        Antes de acederes à CyberGuard, vamos ajustar a 
                        tua experiência. Responde a um breve questionário
                        para avaliar as tuas capacidades e que cursos deves
                        frequentar. Vamos lá!
                    </Text>
                </View>
                {/* Botão de Começar com o formato do circulo */}
                <TouchableOpacity onPress={handleButtonComecarPress}>
                    <View style={Styles.button}>
                        <Text style={Styles.buttonText}>Começar</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        </LinearGradient>
    );
    }

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: -100,
    },
    LogoSurvey: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 200,
    },
    SurveyText: {
        fontFamily: 'Supply-Bold',
        fontSize: 24,
        color: '#6E0271',
        marginBottom: 20,
    },
    text: {
        fontFamily: 'Raleway-Medium',
        fontSize: 17,
        color: '#24364C',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 150,
        height: 150,
        backgroundColor: '#00428A',
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        fontFamily: 'Supply-Bold',
        fontSize: 17,
        color: '#f7f7f7',
    },
});

export default SurveyIntroScreen;