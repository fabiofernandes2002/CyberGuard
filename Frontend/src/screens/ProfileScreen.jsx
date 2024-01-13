import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  VStack,
  NativeBaseProvider,
  Center,
  Box,
  Progress,
} from 'native-base';
import MenuHamburguer from '../components/Menu';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isEditable, setIsEditable] = useState(false);

  const currentLevel = 1;
  const nextLevel = currentLevel + 1;

  const currentXP = 170;
  const nextLevelXP = 300;

  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={Styles.container}>
      <View style={Styles.Menu}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/logo_semfundo.png')}
            style={Styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={Styles.textC}>Cyber</Text>
            <Text style={Styles.textG}>Guard</Text>
          </View>
        </TouchableOpacity>
        <NativeBaseProvider>
          <MenuHamburguer />
        </NativeBaseProvider>
      </View>

      <View style={Styles.container2}>
        <Text style={[Styles.title, {marginBottom: 30}]}>Perfil</Text>
        <View style={Styles.profileDetails}>
          <VStack
            space={2}
            alignItems={{
              base: 'center',
              md: 'flex-start',
            }}>
            <Avatar
              bg="pink.600"
              alignSelf="center"
              size="2xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80',
              }}></Avatar>
          </VStack>
        </View>
      </View>

      <View style={Styles.inputContainer}>
        <Text>Nome</Text>
        <View style={Styles.inputWrapper}>
          <TextInput
            style={[Styles.input, {textAlign: 'left'}]}
            placeholder="John Doe"
            underlineColorAndroid="transparent"
            editable={isEditable}
          />
          <TouchableOpacity
            style={Styles.editButton}
            onPress={() => setIsEditable(!isEditable)}>
            <Text>{isEditable ? '' : 'Editar'}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.underline}></View>
      </View>

      <View style={Styles.inputContainer}>
        <Text>Tipo de Utilizador</Text>
        <View style={Styles.inputWrapper}>
          <TextInput
            style={[Styles.input, {textAlign: 'left'}]}
            placeholder="Normal"
            underlineColorAndroid="transparent"
            editable={false}
          />
        </View>
        <View style={Styles.underline}></View>
      </View>

      <View style={Styles.inputContainer}>
        <Text>Email</Text>
        <View style={Styles.inputWrapper}>
          <TextInput
            style={[Styles.input, {textAlign: 'left'}]}
            placeholder="john@doe.com"
            underlineColorAndroid="transparent"
            editable={isEditable}
          />
          <TouchableOpacity
            style={Styles.editButton}
            onPress={() => setIsEditable(!isEditable)}>
            <Text>{isEditable ? '' : 'Editar'}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.underline}></View>
      </View>

      <View style={Styles.inputContainer}>
        <Text>Password</Text>
        <View style={Styles.inputWrapper}>
          <TextInput
            style={[Styles.input, {textAlign: 'left'}]}
            placeholder="* * * * * * * *"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            editable={isEditable}
          />
          <TouchableOpacity
            style={Styles.editButton}
            onPress={() => setIsEditable(!isEditable)}>
            <Text>{isEditable ? '' : 'Editar'}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.underline}></View>
      </View>
      <View>
        <TouchableOpacity
          style={[
            Styles.button,
            {
              backgroundColor: isEditable ? '#6E0271' : '#D9D9D9',
            },
          ]}
          onPress={() => setIsEditable(!isEditable)}
          disabled={!isEditable}>
          <Text style={Styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <Text style={[Styles.title, {marginTop: 40}]}>Evolução</Text>
      <View style={Styles.levels}>
        <Text style={Styles.levelsText}>Nível {currentLevel}</Text>
        <Text style={Styles.currentXP}>
          {currentXP}/{nextLevelXP} XP
        </Text>
        <Text style={Styles.levelsText}>Nível {nextLevel}</Text>
      </View>
      <View style={Styles.progressBar}>
        <Center w="100%">
          <Box w="120%" maxW="400">
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
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  Menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
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
  },
  textG: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 55,
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
  profileDetails: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 40,
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    marginBottom: -2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    padding: 5,
    borderRadius: 5,
  },
  underline: {
    height: 2,
    backgroundColor: '#6E0271',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7.5,
    marginTop: 20,
    width: 300,
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
  progressBar: {
    width: '100%',
    height: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 5,
  },
  levels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  levelsText: {
    fontFamily: 'Supply-Medium',
    fontSize: 13,
    color: '#1B1B1E',
  },
  currentXP: {
    fontFamily: 'Supply-Regular',
    fontSize: 10,
    color: '#1B1B1E',
  },
});

export default ProfileScreen;
