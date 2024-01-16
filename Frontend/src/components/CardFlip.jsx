import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FlipCard from 'react-native-flip-card';

const Flashcard = ({imgURL, backText, handleCardBackPress}) => {
  return (
    <FlipCard style={{width: 170, height: 150}}>
      {/* Frente do Cartão */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: 10,
          borderColor: '#A9BCD0',
          borderWidth: 1,
        }}>
        <Image source={{uri: imgURL}} style={{width: 170, height: 150}} />
      </View>

      {/* Verso do Cartão */}

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#D8DBE2',
          borderRadius: 10,
          borderColor: '#A9BCD0',
          borderWidth: 1,
        }}>
        <TouchableOpacity onPress={handleCardBackPress}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Supply-Medium',
              textAlign: 'center',
              padding: 2,
              margin: 2,
            }}>
            {backText}
          </Text>
        </TouchableOpacity>
      </View>
    </FlipCard>
  );
};

export default Flashcard;
