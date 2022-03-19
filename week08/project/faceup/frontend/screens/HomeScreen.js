import React, { useState } from 'react';

import { StyleSheet, View, ImageBackground, LogBox } from 'react-native';
import { Button, Input } from 'react-native-elements';

LogBox.ignoreLogs(['Warning: ...']);


export default function HomeScreen(props) {
    const [username, setUsername] = useState('')
    return (
        <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>
            <View style={styles.container}>
                <Input onChangeText={(value) => setUsername(value)} value={username} placeholder='username' inputContainerStyle={{ width: '70%' }} leftIcon={{ type: 'font-awesome', name: 'user', color: '#009788' }} />
                <Button title="Go to gallery" onPress={() => props.navigation.navigate('tabNav', { screen: 'Gallery' })} buttonStyle={{ backgroundColor: '#009788' }} />
            </View>
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