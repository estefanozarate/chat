import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ChatGPT = () => {
    const [data, setData] =  useState([]);
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-003/completions'; 
    const [textInput, setTextInput] = useState('');

    const handleSend = async () => {
        try {
            const prompt = textInput;
            const response = await axios.post(
                apiUrl,
                {
                    prompt: prompt,
                    max_tokens: 1024,
                    temperature: 0.5,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    }
                }
            );
            const text = response.data.choices[0].text;
            setData([...data, { type: 'user', text: textInput }, { type: 'bot', 'text' : text }]);
            setTextInput('');
        } catch (error) {
            console.error('Error sending request to OpenAI API:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ChatGPT</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                inverted
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>
                            {item.type === 'user' ? 'Ninza: ' : 'Bot: '}
                        </Text>
                        <Text style={styles.bot}>{item.text}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText={text => setTextInput(text)}
                placeholder="Ask me anything ..."
            />
           <TouchableOpacity
               style={styles.button}  // aquí debe ser 'style' en lugar de 'styles'
               onPress={handleSend}
           >
              <Text style={styles.buttonText}>Let's Go</Text>
           </TouchableOpacity>
        </View>
    );
};

export default ChatGPT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcc99',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 70
    },
    body: {
        backgroundColor: '#fffcc9',
        width: '102%',
        margin: 10
    },
    bot: {
        fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'yellow',
        width: '90%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue'
    }
});
