import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Avatar, VStack, NativeBaseProvider} from 'native-base';
import MenuHamburguer from '../components/Menu';
import AuthService from '../services/auth.service';

const user = AuthService.getUserLogged();

const ManagerProfileScreen = () => {
  const navigation = useNavigation();
  const [isEditable, setIsEditable] = useState(false);

  const data = [
    {id: 1, name: 'Sofia', difficulty: 'Criptografia'},
    {id: 2, name: 'Carlos', difficulty: 'Segurança em Nuvem'},
    {id: 3, name: 'Emilia', difficulty: 'Blockchain'},
    {id: 4, name: 'Lucas', difficulty: 'Privacidade de dados'},
    {id: 5, name: 'Ana', difficulty: 'Técnicas de Deteção de Ameaças'},
  ];

  const handleRemove = id => {
    // Implement your remove logic here
    console.log(`Remove button clicked for ID: ${id}`);
  };

  const renderTable = () => (
    <View style={Styles.table}>
      <View style={[Styles.row, Styles.headerRow]}>
        <Text style={Styles.headerCell}>Name</Text>
        <Text style={Styles.headerCell}>Difficulty</Text>
        <Text style={[Styles.headerCell, Styles.actionHeaderCell]}>Action</Text>
      </View>
      {data.map(item => (
        <View key={item.id} style={Styles.row}>
          <Text style={Styles.cell}>{item.name}</Text>
          <Text style={Styles.cell}>{item.difficulty}</Text>
          <TouchableOpacity
            style={Styles.actionButton}
            onPress={() => handleRemove(item.id)}>
            <Text style={Styles.actionButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text style={Styles.title}>Perfil</Text>
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
              placeholder={user._j.userInfo.username}
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
              placeholder={user._j.userInfo.userType}
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
              placeholder={user._j.userInfo.email}
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
        <View style={Styles.container}>{renderTable()}</View>
      </ScrollView>
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
  table: {
    margin: 40,
    borderWidth: 2,
    borderColor: '#487281',
    width: '110%',
    borderRadius: 15,
    backgroundColor: '#D8DBE2',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0,
  },
  headerRow: {
    backgroundColor: '#487281',
    borderRadius: 10,
    borderBottomWidth: 0,
  },
  cell: {
    flex: 1,
    padding: 10,
    fontFamily: 'Raleway-Light',
    fontSize: 10,
    color: '#1B1B1E',
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontFamily: 'Supply-Medium',
    fontSize: 13,
    color: '#F7F7F7',
    textAlign: 'center',
  },
  actionHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Supply-Medium',
    fontSize: 13,
    color: '#F7F7F7',
  },
  actionButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'Supply-Regular',
    borderRadius: 20,
    fontSize: 10,
    backgroundColor: '#DC1F2B',
    borderColor: '#710F20',
    borderWidth: 3,
    paddingTop: 4,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default ManagerProfileScreen;
