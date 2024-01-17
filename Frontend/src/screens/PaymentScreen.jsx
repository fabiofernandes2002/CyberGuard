import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Center, NativeBaseProvider} from 'native-base';
import MenuHamburguer from '../components/Menu';
import {
  Select,
  Box,
  CheckIcon,
  Input,
  Checkbox,
  Button,
  VStack,
  HStack,
} from 'native-base';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const handlePayment = () => {
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      alert('Por favor, preencha todos os campos do cartão de crédito.');
      return;
    }

    const cardDetails = {
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
      saveCard,
    };

    console.log('Detalhes do cartão:', cardDetails);

    // Simular um atraso de rede
    setTimeout(() => {
      // Simular um pagamento bem sucedido
      alert('Pagamento bem sucedido!');
      navigation.navigate('CoursesScreen');
    }, 2000);
  };

  const handleCheckboxChange = value => {
    setSaveCard(value);
    if (value) {
      alert('Dados guardados com sucesso');
    }
  };

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={Styles.Menu}>
            {/* Back button */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* Logo pequeno e Cyber e Guard todo separado em baixo do outro */}
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
            {/* Hamburger menu */}
            <NativeBaseProvider>
              <MenuHamburguer />
            </NativeBaseProvider>
          </View>

          {/* Texto de apresentação */}
          <View
            style={[
              Styles.text,
              {borderBottomWidth: 2, borderBottomColor: '#E70D79'},
            ]}>
            <Text style={Styles.textTitulo}>Confirmar Pagamento</Text>
          </View>
          {/* Texto: Pagar com e uma dropdown com três opções Cartão de Credito, paypal, MBWAY */}
          <View style={Styles.paymentMethod}>
            <Text style={Styles.textDescricao}>Pagar com</Text>
            <Center mt={4}>
              <Box maxW="300" borderRadius="10">
                <Select
                  selectedValue={paymentMethod}
                  minWidth="200"
                  accessibilityLabel="Escolha o método de pagamento"
                  placeholder="Escolha o método de pagamento"
                  mt={1}
                  onValueChange={itemValue => setPaymentMethod(itemValue)}
                  bg="#00428A"
                  color="#f7f7f7"
                  fontSize="17"
                  borderRadius="10"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}>
                  <Select.Item label="Cartão de Crédito" value="creditCard" />
                  <Select.Item label="PayPal" value="paypal" />
                  <Select.Item label="MBWAY" value="mbway" />
                </Select>
              </Box>
            </Center>
          </View>
          {/* Texto: Detalhes do cartão */}
          <View style={Styles.text}>
            <VStack
              space={4}
              alignItems="stretch"
              w="100%"
              maxW="400px"
              mx="auto">
              <View>
                {paymentMethod === 'creditCard' ? (
                  <VStack
                    space={4}
                    alignItems="stretch"
                    w="100%"
                    maxW="400px"
                    mx="auto">
                    <Text style={Styles.textLabel}>Número de Cartão</Text>
                    <Input
                      variant="unstyled"
                      style={Styles.input}
                      size="md"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                    />
                    <Text style={Styles.textLabel}>Nome do titular</Text>
                    <Input
                      variant="unstyled"
                      style={Styles.input}
                      value={cardHolder}
                      onChangeText={setCardHolder}
                    />
                    <Text style={Styles.textLabel}>Data de validade e CVV</Text>
                    <HStack space={4}>
                      <Input
                        variant="unstyled"
                        style={Styles.input}
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                        flex={1}
                      />
                      <Input
                        variant="unstyled"
                        style={Styles.input}
                        value={cvv}
                        onChangeText={setCvv}
                        flex={1}
                      />
                    </HStack>
                    <Checkbox
                      value={saveCard}
                      onValueChange={handleCheckboxChange}
                      style={{
                        backgroundColor: '#D8DBE2',
                        borderColor: '#487281',
                        borderRadius: 7.5,
                        borderWidth: 3,
                        height: 25,
                        width: 25,
                      }}>
                      <Text style={Styles.textLabel}>
                        Guardar dados do cartão
                      </Text>
                    </Checkbox>
                    {/* Detalhes finais */}

                    <View style={Styles.detalhesFinais}>
                      <Text style={Styles.textLabel}>Detalhes finais</Text>
                      <View style={Styles.detalhesPagamento}>
                        <Text style={Styles.textDetalhes}>Total(Euro)</Text>
                        <Text style={Styles.textDetalhes}>20.99€</Text>
                      </View>
                    </View>
                    <View style={Styles.button}>
                      <Text style={Styles.buttonText} onPress={handlePayment}>
                        Finalizar compra
                      </Text>
                    </View>
                  </VStack>
                ) : (
                  <View style={Styles.centeredMessage}>
                    <Text style={Styles.textLabel}>
                      Método de pagamento não disponível no momento.
                    </Text>
                  </View>
                )}
              </View>
            </VStack>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  textTitulo: {
    fontFamily: 'Supply-Bold',
    fontSize: 24,
    color: '#6E0271',
    marginBottom: 20,
  },
  textDescricao: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#24364C',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  Menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  textC: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 55,
    justifyContent: 'center',
    marginTop: -5,
  },
  textG: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 55,
    justifyContent: 'center',
    marginTop: -5,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  textLabel: {
    fontFamily: 'Supply-Bold',
    fontSize: 17,
    color: '#24364C',
    textAlign: 'left',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6E0271',
    borderRadius: 7.5,
    marginTop: 20,
    width: '90%',
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
  input: {
    height: 45,
    borderColor: '#487281',
    borderWidth: 5,
    borderRadius: 7.5,
    padding: 10,
    backgroundColor: '#D8DBE2',
  },
  detalhesPagamento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#487281',
    borderRadius: 7.5,
    borderColor: '#D8DBE2',
    borderWidth: 5,
  },
  textDetalhes: {
    fontFamily: 'Supply-Bold',
    fontSize: 14,
    color: '#F7F7F7',
    textAlign: 'left',
  },
  centeredMessage: {
    flex: 1,
    alignSelf: 'center',
    padding: 20,
  },
});

export default PaymentScreen;
