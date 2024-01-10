import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import RegistoComponent from '../components/Registo';
import SetaEsquerda from '../assets/SetaEsquerda.svg';

const RegistoScreen = () => {

    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={Styles.container}>
            <View>
                <View style= {Styles.Menu}>
                    {/* Back button */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <SetaEsquerda
                            width={30}
                            height={30}
                            style={Styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                {/* Logo */}
                <View style={Styles.LogoRegisto}>
                    <Image
                        source={require('../assets/logo_semfundo.png')}
                        style={Styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={Styles.LoginText}>REGISTO</Text>
                </View>
                {/* inputs - chamar LoginComponent */}
                <RegistoComponent />
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
        marginBottom: 50,
        marginTop: -50,
    },
    Menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});

export default RegistoScreen;