import React, { useState } from 'react';

import { StyleSheet, Text, View, ScrollView, LogBox, Pressable, Button } from 'react-native';
import { Overlay } from 'react-native-elements'
import { Video, AVPlaybackStatus } from 'expo-av';
LogBox.ignoreLogs(['Warning: ...']);

import { connect } from 'react-redux';

import { Card } from 'react-native-elements'


function VideoScreen(props) {
    const [visible, setVisible] = useState(false)
    console.log(props.videos)

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const thumbnailPressHandler = () => {
        console.log('detected')
        setVisible(true)
    }

    let tempTab = props.videos.map((elem, i) => {
        return (
            <Pressable key={i} onPress={() => thumbnailPressHandler()}>
                <Card containerStyle={{ width: '90%', padding: 10 }}>
                    <Card.Image
                        style={{ padding: 0, width: '100%', height: 160 }}
                        source={{ uri: elem.thumbnailUrl }}
                    />
                </Card >
            </Pressable >
        )
    })


    return (
        <View style={styles.container}>
            <Text style={styles.title}>John's Videos</Text>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {tempTab}
            </ScrollView>
            {/* <Overlay isVisible={visible}>
                <View style={styles.container}>
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />
                    <View style={styles.buttons}>
                        <Button
                            title={status.isPlaying ? 'Pause' : 'Play'}
                            onPress={() =>
                                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                            }
                        />
                    </View>
                </View>
            </Overlay> */}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 20
    }
})

function mapStateToProps(state) {
    return { videos: state.videos }
}
export default connect(mapStateToProps, null)(VideoScreen);
