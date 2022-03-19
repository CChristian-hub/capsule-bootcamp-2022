import React, { useState, useEffect, useRef } from 'react';

import { View, LogBox, Text, SafeAreaView, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

import { Button } from 'react-native-elements/dist/buttons/Button';
import { Overlay } from 'react-native-elements';

import { useIsFocused } from '@react-navigation/native';

import * as VideoThumbnails from 'expo-video-thumbnails';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

LogBox.ignoreLogs(['Warning: ...']);

import { connect } from 'react-redux';


function SnapScreen(props) {
    const [hasPermission, setHasPermission] = useState(false);
    const isFocused = useIsFocused();
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [torch, setTorch] = useState(Camera.Constants.FlashMode.off)
    const [visible, setVisible] = useState(false);
    const [recording, setRecording] = useState(false)

    var cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status) setHasPermission(status === 'granted');
            await Audio.requestPermissionsAsync()
        })();
    }, []);

    const generateThumbnail = async (videoPath) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(videoPath);
            return uri
        } catch (e) {
            console.warn(e);
        }
    };

    const sendPictureToBack = async (filePath, route) => {
        var data = new FormData();

        data.append('picture', {
            uri: filePath,
            type: 'image/jpeg',
            name: 'image.jpeg',
        });
        let yourIP = 'your ip by typing ifconfig | grep inet.'
        let rawResponse = await fetch(yourIP + route, {
            method: 'post',
            body: data
        });
        let response = await rawResponse.json()
        if (response.result || !response.response) {
            return response
        }
        return undefined
    }

    const sendVideoToBack = async (filePath, route) => {
        var data = new FormData();

        data.append('video', {
            uri: filePath,
            type: 'video/mp4',
            name: 'videoName.mp4'
        })
        let yourIP = 'your ip by typing ifconfig | grep inet.'
        let rawResponse = await fetch(yourIP + route, {
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data', },
            body: data
        })
        let response = await rawResponse.json()
        if (response.result) {
            return response.videoUrl
        }
        return undefined
    }

    let cam;
    let recordButtonColor;
    if (!recording) {
        recordButtonColor = 'red'
    } else {
        recordButtonColor = 'grey'
    }

    if (isFocused) {
        cam = <Camera style={{ flex: 1 }} type={type} flashMode={torch} ref={ref => (cameraRef = ref)} ratio="16:9" style={{ height: '100%', width: "100%", }}>
            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', }}>
                <Pressable style={{ alignSelf: 'flex-end', alignItems: 'center', }}
                    onPress={() => { setType(type == Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back) }}>
                    <Ionicons name="camera-reverse" size={30} color="white" />
                    <Text style={{ color: 'white', fontSize: 20 }}> Flip</Text>
                </Pressable>
                <Pressable style={{ alignSelf: 'flex-end', alignItems: 'center', }}
                    onPress={() => { setTorch(torch == Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off) }} >
                    <FontAwesome name="flash" size={30} color="white" />
                    <Text style={{ color: 'white', fontSize: 20 }}> Flash</Text>
                </Pressable>


                <Pressable style={{ alignSelf: 'flex-end', alignItems: 'center' }}
                    onPress={async () => {
                        if (!recording) {
                            setRecording(true)

                            //* Getting video path from device
                            let video = await cameraRef.recordAsync();
                            console.log('video path', video.uri)

                            //* Getting thumbnail path from the video
                            let imagePath = await generateThumbnail(video.uri)
                            console.log('thumbnail path:', imagePath)

                            //* Sending the thumbnail to the back
                            let thumbnailPath = await sendPictureToBack(imagePath, 'upload-thumbnail')
                            console.log('thumbnail url:', thumbnailPath.url)

                            //* Sending the video to the back
                            let videoPath = await sendVideoToBack(video.uri, 'upload-video')
                            console.log('video url:', videoPath)

                            props.saveVideo(thumbnailPath.url, videoPath);
                            setVisible(false)

                        } else {
                            setVisible(true)
                            setRecording(false)
                            cameraRef.stopRecording()
                        }
                    }}>
                    <MaterialCommunityIcons name="moon-full" size={44} color={recordButtonColor} />
                    <Text style={{ color: 'white', fontSize: 20 }}> Record</Text>
                </Pressable>
            </View>

            <Button title="Snap" buttonStyle={{ backgroundColor: '#009788' }} icon={{ type: 'font-awesome', name: 'save', color: 'white' }}
                onPress={async () => {
                    if (cameraRef) {
                        setVisible(true)
                        let photo = await cameraRef.takePictureAsync({ quality: 0.7, base64: true, exif: true });
                        let picPath = await sendPictureToBack(photo.uri, 'upload')

                        props.savePicture(picPath.url, picPath.face.detectedFaces[0])
                        setVisible(false)
                    }
                }} />

        </Camera >
    } else {
        cam = <Text>ce texte ne sera jamais visible</Text>
    }


    if (hasPermission) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <Overlay isVisible={visible}>
                    <Text>
                        Loading...
                    </Text>
                </Overlay>
                {cam}
            </SafeAreaView>
        )
    }
    else {
        return <View style={{ flex: 1 }} />;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        savePicture: function (url, face) {
            dispatch({ type: 'addPicture', url, face })
        },
        saveVideo: function (thumbnailUrl, videoUrl) {
            dispatch({ type: 'addVideo', thumbnailUrl, videoUrl })
        },
    }
}
export default connect(null, mapDispatchToProps)(SnapScreen);
