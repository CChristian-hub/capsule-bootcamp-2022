import React from 'react';

import { StyleSheet, Text, View, ScrollView, LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import { connect } from 'react-redux';

import { Card, Badge } from 'react-native-elements'


function GalleryScreen(props) {


    let tempTab = props.photos.map((elem, i) => {
        return (
            <Card key={i} containerStyle={{ width: '90%', padding: 0 }}>
                <Card.Image
                    style={{ padding: 0, width: '100%', height: 160 }}
                    source={{ uri: elem.url }}
                />
                <View style={{ marginBottom: 10, marginTop: 10, alignItems: 'center' }}>
                    <Badge value={elem.face.age} status="success" />
                    <Badge value={elem.face.gender} status="success" />
                </View>

            </Card >
        )
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>John's Gallery</Text>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {tempTab}
            </ScrollView>
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
});


function mapStateToProps(state) {
    return { photos: state.photos }
}
export default connect(mapStateToProps, null)(GalleryScreen);
