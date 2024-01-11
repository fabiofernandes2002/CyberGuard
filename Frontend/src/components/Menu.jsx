import React, {useState, useEffect} from 'react';
import {
  Menu,
  Box,
  Text,
  Pressable,
  VStack,
  HStack,
  Spacer,
  Switch,
} from 'native-base';
import MenuH from '../assets/Menu.svg';
import ButtonFecharMenu from '../assets/Fechar.svg';
import AuthService from '../services/auth.service';
import {useNavigation} from '@react-navigation/native';

function MenuHamburguer() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  const handleMenuClick = option => {
    setSelectedOption(option);
    // Implemente a lógica de navegação ou outras ações com base na opção clicada
    // Por exemplo, você pode navegar para diferentes telas com base na opção clicada.
    switch (option) {
      case 'Discover':
        navigation.navigate('MundosScreen');
        break;
      // Adicione casos para outras opções conforme necessário
      case 'Perfil':
        navigation.navigate('ProfileScreen');
        break;
      default:
        break;
    }
  };

  const menuOptions = [
    'Discover',
    'Perfil',
    'Chat',
    'FAQ´s',
    'About Us',
    'Notificações',
  ];

  const routeToMenuOption = {
    MundosScreen: 'Discover',
    AboutUsScreen: 'About Us',
  };

  const route = useRoute();
  const selectedOption = routeToMenuOption[route.name];

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthService.getUserLogged();
      setUsername(user?.userInfo?.username || '');
    };
    getUser();
  }, []);

  // Chamar a função de logout
  const logout = () => {
    AuthService.logout();
    // redirecionar para a página de SplashScreen
    navigation.navigate('SplashScreen');
  };

  return (
    <Box style={styles.box}>
      <Menu
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        trigger={triggerProps => (
          <Pressable {...triggerProps}>
            <MenuH width={30} height={30} />
          </Pressable>
        )}
        style={styles.menu2}>
        <VStack space={2.5} w="350" style={styles.menu}>
          <HStack w="100%" justifyContent="space-between">
            {/* Botão Logout no topo do menu */}
            <Pressable m={3} onPress={logout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
            {/* Botão para fechar o menu */}
            <Pressable m={3} onPress={() => setIsOpen(false)}>
              <ButtonFecharMenu width={20} height={20} />
            </Pressable>
          </HStack>
          {/* Itens do menu */}
          <Menu.Item _pressed={{backgroundColor: 'transparent'}}>
            <HStack space={1}>
              <Text style={styles.welcomeText}>Bem vindo,</Text>
              <Text style={styles.nameText}>{username}</Text>
            </HStack>
            {/* Itens do menu */}
            <Menu.Item _pressed={{ backgroundColor: 'transparent' }}>
                <HStack space={1}>
                    <Text style={styles.welcomeText}>Bem vindo,</Text>
                    <Text style={styles.nameText}>{username}</Text>
                </HStack>
            </Menu.Item>
            {menuOptions.map(option => {
              const isSelected = option === selectedOption;
              return (
                <Menu.Item
                  key={option}
                  style={isSelected ? styles.selectedMenuOption : null}
                  _pressed={{ backgroundColor: 'transparent' }}
                >
                  <Pressable onPress={() => handleMenuClick(option)}>
                    <Text style={isSelected ? styles.selectedMenuText : styles.menuText}>{option}</Text>
                  </Pressable>
                </Menu.Item>
              );
            })}
            {/* Switch de Dark Mode */}
            <HStack alignItems="center" space={4} m={3}>
              <Switch size="md" offTrackColor="#6E0271" onTrackColor="#6E0271" offThumbColor="#FFFFFF" onThumbColor="#FFFFFF" />
              <Text style={styles.menuText}>Dark Mode</Text>
            </HStack>
        </VStack>
      </Menu>
    </Box>
  );
}

const styles = {
  box: {
    alignItems: 'flex-end',
  },
  menu: {
    backgroundColor: '#D8DBE2',
    borderRadius: 20,
  },
  menu2: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    borderRadius: 20,
  },
  selectedMenuOption: {
    color: '#6E0271',
    borderLeftColor: '#6E0271',
    borderLeftWidth: 5,
  },
  selectedMenuText: {
    color: '#6E0271',
    fontSize: 18,
    fontFamily: 'Supply-Bold',
  },
  logoutButton: {
    margin: 3,
    borderRadius: 10,
    backgroundColor: '#6E0271',
    color: '#f7f7f7',
    padding: 5,
  },
  logoutText: {
    fontSize: 17,
    color: '#f7f7f7',
    fontFamily: 'Supply-Bold',
  },
  welcomeText: {
    fontSize: 18,
    color: '#1B1B1E',
    fontFamily: 'Raleway-Light',
  },
  nameText: {
    fontSize: 18,
    color: '#1B1B1E',
    fontFamily: 'Supply-Bold',
  },
  menuText: {
    fontSize: 18,
    color: '#1B1B1E',
    fontFamily: 'Supply-Bold',
  },
};

export default MenuHamburguer;
