import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CoolIcon from '../assets/coolIcon.svg';

const SurveyResultScreen = ({route}) => {
    const { score } = route.params;
    const navigation = useNavigation();
    const handleLinkTextClick = () => {
        navigation.navigate('MundosScreen');
    }


  return (
    <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={Styles.container}>
        <View>
            {/* Logo */}
            <View style={Styles.LogoLogin}>
                <Image
                    source={require('../assets/logo_semfundo.png')}
                    style={Styles.logo}
                    resizeMode="contain"
                />
                <Text style={Styles.pontuacaoText}>Pontuação: {score}</Text>
            </View>
            {/* coolIcon */}
            <View style={Styles.coolIcon}>
                <CoolIcon
                    width={100}
                    height={100}
                    style={Styles.icon}
                />
            </View>
            {/* Text results */}
            <View style={Styles.text}>
                <Text style={Styles.text}>
                    Parabéns por completares este questionário!
                </Text>
                <Text style={[Styles.text, Styles.spacing]}>
                    Clica {" "}
                        <Text onPress={handleLinkTextClick} style={Styles.linkText}>
                            Aqui
                        </Text>
                    {" "} e vê os vários cursos que temos para ti.
                </Text>
            </View>
        </View>
    </LinearGradient>
  );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: -150,
    },
    logo: {
        width: 230,
        height: 230,
        marginBottom: 20,
        alignSelf: 'center',
        marginBottom: 50,
    },
    pontuacaoText: {
        color: '#6E0271',
        fontSize: 24,
        fontFamily: 'Supply-Bold',
        textAlign: 'center',
        marginBottom: 50,
        marginTop: -50,
    },
    text: {
        color: '#1B1B1E',
        fontSize: 17,
        fontFamily: 'Raleway-Medium',
        textAlign: 'center',
    },
    linkText: {
        color: '#6E0271',
        fontSize: 17,
        fontFamily: 'Supply-Bold',
        textAlign: 'center',
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 50,
    },
    spacing: {
        marginTop: 20,
    },

});
export default SurveyResultScreen;