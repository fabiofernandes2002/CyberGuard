import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import MenuHamburguer from '../components/Menu';

const ChatScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={styles.container}>
      <View>
        <View style={styles.Menu}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
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
      {/* <View style={styles.content}>
                <Text style={styles.title}></Text>
            </View> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  Menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

module.exports = ChatScreen;
