import React from 'react';
import { View, Text } from 'react-native';
import FlipCard from 'react-native-flip-card';

const Flashcard = ({ frontText, backText }) => {
  return (
    <FlipCard style={{ width: 170, height: 150 }}>
      {/* Frente do Cartão */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10, borderColor: '#333', borderWidth: 1 }}>
        <Text style={{ fontSize: 16 }}>{frontText}</Text>
      </View>

      {/* Verso do Cartão */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10, borderColor: '#333', borderWidth: 1 }}>
        <Text style={{ fontSize: 16 }}>{backText}</Text>
      </View>
    </FlipCard>
  );
};

export default Flashcard;