import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text } from "react-native";

import { Input, Button } from 'react-native-elements';

import { connect } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';


function HomeScreen(props) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        function loadUsername() {
            AsyncStorage.getItem('username', function (error, data) {
                props.setUsername(data)
                setUsername(data)
            })
        }
        loadUsername();
    }, []);

    var inputStyle = {
        marginBottom: 25, width: '70%'
    }
    var welcomeTextStyle = { display: 'none' }

    if (props.myUsername) {
        inputStyle = { marginBottom: 25, width: '70%', display: 'none' }
        welcomeTextStyle = { marginBottom: 50, fontSize: 24 }
    }

    return (
        <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>
            <Text style={welcomeTextStyle}>
                Welcome back {username}
            </Text>
            <Input placeholder='username'
                containerStyle={inputStyle}
                onChangeText={(value) => setUsername(value)}
                value={username}
                leftIcon={{ type: 'font-awesome', name: 'user', color: '#CB6157' }}
            />
            <Button
                onPress={() => {
                    props.setUsername(username);
                    AsyncStorage.setItem('username', username);
                    setUsername('');
                    props.navigation.navigate('tabNav', { screen: 'Map' });
                }}
                title="Go to Map"
                icon={{
                    name: 'arrow-right',
                    type: 'font-awesome',
                    size: 20,
                    color: '#CB6157',
                }}
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps(state) {
    return { myUsername: state.username }
}

function mapDispatchToProps(dispatch) {
    return {
        setUsername: function (username) {
            dispatch({ type: 'saveUsername', username })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
