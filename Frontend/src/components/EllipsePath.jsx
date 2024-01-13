import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ellipse from '../assets/Ellipse.svg';

const EllipsePath = ({numEllipses}) => {
  const renderEllipses = () => {
    const ellipses = [];
    for (let i = 0; i < numEllipses; i++) {
      ellipses.push(<Ellipse key={i} width={10} height={10} />);
    }
    return ellipses;
  };

  return <View style={Styles.container}>{renderEllipses()}</View>;
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ellipse: {
    // Estilos adicionais para as elipses, se necessário
  },
});

export default EllipsePath;
