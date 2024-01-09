import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Menu from '../assets/Menu.svg';

const AboutUsScreen = () => {

    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={styles.container}>
            <View>
                <View style={styles.Logo}>
                    <TouchableOpacity>
                        <Image
                            source={require('../assets/logo_semfundo.png')}
                            style={styles.Logo}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    {/* Hamburger menu */}
                    <TouchableOpacity onPress={() => { /* código para abrir o menu */ }}>
                        <Menu
                            width={30}
                            height={30}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Equipa</Text>
                <View style={styles.team}>
                    <Image
                        source={require('../assets/FotoBernardo.svg')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.name}>Bernardo</Text>
                    <Image
                        source={require('../assets/FotoFabio.svg')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.name}>Fábio</Text>
                    <Image
                        source={require('../assets/FotoLucas.svg')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.name}>Lucas</Text>
                </View>
                <Text style={styles.title}>About Us</Text>
                <Text style={styles.aboutUsText}>
                    Como alunos do terceiro ano do curso de Tecnologias Web e Sistemas de Informação,
                    mergulhámos a fundo no desenvolvimento Web, adquirindo competências sólidas em linguagens
                    como HTML, CSS e JavaScript, bem como em estruturas modernas, incluindo React e Vue.
                    Com experiência prática em projetos, exploramos áreas avançadas como bases de dados,
                    segurança da informação e integração de API. Valorizando a colaboração, partilhamos
                    ideias para enriquecer o nosso conhecimento coletivo. A nossa paixão pela aprendizagem
                    constante e o compromisso com a excelência levam-nos a enfrentar os desafios dinâmicos
                    da tecnologia, ansiosos por dar um contributo significativo para a área do desenvolvimento web.
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    Logo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        width: '10px',
        height: '10px',
    },
    content: {
        marginTop: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    team: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    aboutUsText: {
        fontSize: 15,
        textAlign: 'justify',
    },
});

export default AboutUsScreen;