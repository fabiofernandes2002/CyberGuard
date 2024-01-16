import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import MenuHamburguer from '../components/Menu';
import ChatService from '../services/chat.services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
    const [filteredChats, setFilteredChats] = useState([]);
  const inputRef = useRef();

  const handleReply = (id) => {
    setReplyingTo(id);
    inputRef.current.focus();
  };

  const fetchChats = async () => {
    try {
      const chats = await ChatService.getAllChats();
      setChat(chats);
    } catch (error) {
      console.error('Erro ao buscar chats:', error);
    }
  };

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        setFilteredChats(
            chat.filter(chatItem =>
            chatItem.messages.some(message =>
                message.content.toLowerCase().split(' ').some(word =>
                word.includes(searchQuery.toLowerCase())
                )
            )
            )
        );
    }, [searchQuery, chat]);
      
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSend = async () => {
        if (message.trim()) {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const userId = user.id;
        const username = user.userInfo.username;
    
        if (replyingTo) {
            try {
            const result = await ChatService.addMessageToChat(replyingTo, message, username);
            console.log('Resposta da API ao adicionar mensagem:', result);
    
            if (result && result.success) {
                setChat(chat.map(chatItem => 
                chatItem._id === replyingTo
                    ? { ...chatItem, messages: [...chatItem.messages, { userId: userId, username:username, content: message, time: Date.now() }] }
                    : chatItem
                ));
            } else {
                console.error('Erro ao adicionar resposta ao chat:', result && result.msg);
            }
            } catch (error) {
            console.error('Erro ao adicionar resposta ao chat:', error);
            }
        } else {
            try {
            const result = await ChatService.createChat(message, username);
            console.log('Resposta da API ao criar chat:', result);
    
            if (result && result.success) {
                setChat([...chat, { ...result.chat, messages: [{ userId: userId, username: username, content: message, time: Date.now() }] }]);
            } else {
                console.error('Erro ao criar chat:', result && result.msg);
            }
            } catch (error) {
            console.error('Erro ao criar chat:', error);
            }
        }
    
        setMessage('');
        }
    };
  
  



  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={styles.container}>
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
        <TextInput
        placeholder="Pesquisa..."
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={handleSearch}
        />
        <FlatList
         style={{ width: '100%' }}
        data={filteredChats}
        keyExtractor={(item, index) => `${item._id || index}`}
        renderItem={({ item }) => (
            <View style={styles.message}>
        {item.messages && item.messages.map((message, index) => (
            <View key={index}>
                <Text style={styles.username}>{message.username}</Text>
                <Text style={styles.messageText} numberOfLines={2}>{message.content}</Text>
          </View>
        ))}
        <View style={styles.replyContainer}>
            <TouchableOpacity onPress={() => handleReply(item.id)}>
            <Text style={styles.replyText}>Responder</Text>
            </TouchableOpacity>
        </View>
        {item.responses && item.responses.map((response, index) => (
            <Text key={index} style={styles.responseText}>{response}</Text>
        ))}
        </View>
        )}
        />
        <View style={styles.inputContainer}>
        <TextInput
            ref={inputRef}
            value={message}
            onChangeText={setMessage}
            placeholder="Escreve uma mensagem"
            style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    Menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30,
        marginBottom: 50,
    },
    searchBar: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#f7f7f7',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#6E0271',
        paddingHorizontal: 20,
        color: '#1B1B1E',
        fontFamily: 'Raleway-Medium',
        fontSize: 17,
    },
    message: {
        width: '100%',
        padding: 20,
        backgroundColor: '#D8DBE2',
        borderRadius: 8,
        marginBottom: 20,
    },
    messageText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 17,
        color: '#1B1B1E',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        paddingHorizontal: 20,
        color: '#1B1B1E',
        fontFamily: 'Raleway-Medium',
        fontSize: 17,
    },
    sendButton: {
        width: 100,
        height: 50,
        backgroundColor: '#00428A',
        borderRadius: 8,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Supply-Bold',
        fontSize: 17,
    },
    replyText: {
        color: '#6E0271',
        //textDecorationLine: 'underline',
    },
    responseText: {
        fontFamily: 'Raleway-Medium',
        fontSize: 14,
        color: '#00428A',
        marginLeft: 10,
    },
    replyContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    username: {
        fontFamily: 'Supply-Bold',
        fontSize: 17,
        color: '#1B1B1E',
        marginBottom: 5,
    },

});

export default ChatScreen;
