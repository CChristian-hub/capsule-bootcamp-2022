//* React import
import React, { useState, useEffect } from 'react';

//* Reactn import
import { View, ScrollView, KeyboardAvoidingView } from "react-native";

//* Reactn elements
import { Input, Button, ListItem } from 'react-native-elements';

//* SocketIO
import socketIOClient from "socket.io-client";


let yourIP = "get your computer's ip by typing: 'ifconfig | grep inet.' in your terminal"
var socket = socketIOClient("http://" + yourIP);

//* Redux
import { connect } from 'react-redux';


function ChatScreen(props) {
    const [currentMessage, setCurrentMessage] = useState('')
    const [listMessage, setListMessage] = useState([])

    useEffect(() => {
        socket.on('sendMessageToAll', (dataFromBack) => {
            setListMessage([...listMessage, { username: dataFromBack.username, message: dataFromBack.message }])
        });
    }, [listMessage]);

    const buttonPressHandler = () => {
        socket.emit("sendMessage", { username: props.myUsername, message: currentMessage })
        setCurrentMessage('')
    }

    let messageArray = listMessage.map((elem, i) => {
        return (
            <ListItem key={i}>
                <ListItem.Content>
                    <ListItem.Title>{elem.message}</ListItem.Title>
                    <ListItem.Subtitle>{elem.username}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    })
    return (
        <View style={{ flex: 1 }}>
            {/* //* ScollView with messages */}
            <ScrollView style={{ flex: 1, marginTop: 50 }}>
                {messageArray}
            </ScrollView>
            {/* //* This sets a padding for IOS devices and a height for other devices */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Input
                    containerStyle={{ marginBottom: 5 }}
                    placeholder='Your message'
                    onChangeText={(msg) => setCurrentMessage(msg)}
                    value={currentMessage}
                />

                <Button
                    title="Send"
                    icon={{
                        name: 'envelope-o',
                        type: 'font-awesome',
                        size: 20,
                        color: '#FFFFFF',
                    }}
                    buttonStyle={{ backgroundColor: "#eb4d4b" }}
                    type="solid"
                    onPress={() => buttonPressHandler()}
                />

            </KeyboardAvoidingView>
        </View>
    )
}


function mapStateToProps(state) {
    return { myUsername: state.username }
}
export default connect(mapStateToProps, null)(ChatScreen);
