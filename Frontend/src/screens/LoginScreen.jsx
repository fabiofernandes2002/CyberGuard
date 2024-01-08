import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import LoginComponent from '../components/Login';
import SetaEsquerda from '../assets/SetaEsquerda.svg';
import AuthService from '../services/auth.service';
import { NativeBaseProvider } from 'native-base';
import MenuHamburguer from '../components/Menu';

const LoginScreen = () => {

    const navigation = useNavigation();
    const handleButtonLRegistoPress = () => {
        navigation.navigate('RegistoScreen');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleButtonEntrarPress = async () => {
        try {
            // Chame a função de login do AuthService
            const user = await AuthService.login(email, password);
    
            // Verifique se a função de login retorna um objeto de usuário
            if (user) {
                // Faça algo com as informações do usuário, se necessário
                console.log('Usuário logado:', user);
    
                // Navegue para a próxima tela
                navigation.navigate('SurveyIntroScreen');
    
                // Exiba um alerta de login bem-sucedido
                Alert.alert('Sucesso', 'Login efetuado com sucesso!');
            } else {
                // Se a função de login não retornar um usuário, exiba uma mensagem de erro
                Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            // Lidar com outros erros de login, por exemplo, exibir uma mensagem de erro
            Alert.alert('Erro', 'Erro durante o login. Verifique suas credenciais.');
        }
    };

  return (
    <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={Styles.container}>
        <View>
            <View style={Styles.Menu}>
                {/* Back button */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SetaEsquerda
                        width={30}
                        height={30}
                        style={Styles.icon}
                    />
                </TouchableOpacity>
                {/* Menu Hamburguer */}
                <NativeBaseProvider>
                    <MenuHamburguer />
                </NativeBaseProvider>
            </View>
            {/* Logo */}
            <View style={Styles.LogoLogin}>
                <Image
                    source={require('../assets/logo_semfundo.png')}
                    style={Styles.logo}
                    resizeMode="contain"
                />
                <Text style={Styles.LoginText}>LOGIN</Text>
            </View>
            {/* texto login */}
            <View style={Styles.text}>
                <Text style={Styles.text}>Digite teu email e password</Text>
                <Text style={Styles.text3}>para fazer o login</Text>

                {/* inputs - chamar LoginComponent */}
                <LoginComponent setEmail={setEmail} setPassword={setPassword} />

                {/* botão de Login */}
                <TouchableOpacity onPress={handleButtonEntrarPress}>
                    <View style={Styles.button1}>
                        <Text style={Styles.buttonText}>Entrar</Text>
                    </View>
                </TouchableOpacity>

                {/* texto */}
                <View style={Styles.textContainer}>
                    <Text style={Styles.text1}>Não tens conta?</Text>
                    {/* botão - Criar uma! */}
                    {/* <TouchableOpacity onPress={() => {}}>
                        <View style={Styles.button2}>
                            <Text style={Styles.buttonText}>Criar uma!</Text>
                        </View>
                    </TouchableOpacity> */}
                    
                    <Text style={Styles.LinkText} onPress={handleButtonLRegistoPress}>Criar uma!</Text>
                    
                </View>
                {/* TextFooter */}
                <View>
                    <Text style={Styles.textFooter}>Precisas de ajuda? Visita as nossas FAQ`s</Text>
                </View>
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
        marginTop: -100,
    },
    logo: {
        width: 230,
        height: 230,
        marginBottom: 20,
        alignSelf: 'center',
    },
    LoginText: {
        color: '#6E0271',
        fontSize: 24,
        fontFamily: 'Supply-Bold',
        textAlign: 'center',
        // ficar mais proximo do logo
        marginBottom: 50,
        // sem mover o logo para cima
        marginTop: -50,
    },
    text: {
        color: '#1B1B1E',
        fontSize: 17,
        fontFamily: 'Raleway-Medium',
        textAlign: 'center',
    },
    text3: {
        marginBottom: 30,
        color: '#1B1B1E',
        fontSize: 17,
        fontFamily: 'Raleway-Medium',
        textAlign: 'center',
    },
    text1: {
        color: '#1B1B1E',
        fontSize: 17,
        fontFamily: 'Raleway-Regular',
        textAlign: 'center',
        marginRight: 5,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button1: {
        backgroundColor: '#6E0271',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7.5,
        marginTop: 20,
        width: 230,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 20,
    },
    button2: {
        backgroundColor: '#6E0271',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7.5,
        marginTop: 5,
    },
    buttonText: {
        color: '#F7F7F7',
        fontSize: 17,
        fontFamily: 'Supply-Bold',
        textAlign: 'center',
    },
    LinkText: {
        color: '#6E0271',
        fontSize: 17,
        fontFamily: 'Supply-Bold',
        textAlign: 'center',
    },
    textFooter: {
        position: 'absolute', // Posiciona o elemento absolutamente
        bottom: -110, // Alinha o elemento na parte inferior
        color: '#1B1B1E',
        fontSize: 17,
        fontFamily: 'Raleway-Regular',
        textAlign: 'center',
        width: '100%', // Garante que o elemento ocupe toda a largura da tela
    },
    Menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});
export default LoginScreen;