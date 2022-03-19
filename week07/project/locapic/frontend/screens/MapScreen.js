import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from "react-native";
import { Button, Overlay, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';




//* map import
import MapView, { Marker } from 'react-native-maps';

//* location and permission import
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

function MapScreen(props) {
    //* My own little state, might not be needed later on in the project
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [addPOI, setAddPOI] = useState(false)
    const [listPOI, setListPOI] = useState([])
    const [poiTitle, setPoiTitle] = useState('');
    const [poiDescription, setPoiDescription] = useState('')
    const [newCoordinate, setNewCoordinate] = useState({});
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        async function askPermissions() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                Location.watchPositionAsync({
                    enableHighAccuracy: true,
                    timeInterval: 1000
                }, (location) => {
                    setCurrentLatitude(location.coords.latitude)
                    setCurrentLongitude(location.coords.longitude)
                });
            }
        }
        function loadPois() {
            AsyncStorage.getItem('pois', function (error, data) {
                let temp = JSON.parse(data);
                setListPOI(temp)
            })
        }
        askPermissions();
        loadPois();
    }, []);

    //* This has become useless since we store it locally on the phone now instead of the store
    // useEffect(() => {
    //     setListPOI(props.markerList)
    // }, [props.markerList])

    const MapViewPressHandler = (coordinate) => {
        if (addPOI) {
            toggleOverlay();
            setNewCoordinate(coordinate)
            setAddPOI(!addPOI);
        }
    }


    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const poiAdditionHandler = () => {
        setListPOI(prevState => [...prevState, { coordinate: newCoordinate, title: poiTitle, description: poiDescription }])
        props.addMarkerToStore(newCoordinate, poiTitle, poiDescription)
        AsyncStorage.setItem('pois', JSON.stringify([...listPOI, { coordinate: newCoordinate, title: poiTitle, description: poiDescription }]))
        setPoiTitle('')
        setPoiDescription('')
        setNewCoordinate({})
        toggleOverlay();
    }

    const markerArray = listPOI.map((elem, i) => {
        return (
            <Marker key={i} coordinate={{ latitude: elem.coordinate.latitude, longitude: elem.coordinate.longitude }} title={elem.title} description={elem.description} pinColor='aqua' />
        )
    })

    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }} initialRegion={{ latitude: 48.866667, longitude: 2.333333, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                onPress={(e) => MapViewPressHandler(e.nativeEvent.coordinate)}>
                {markerArray}
                <Marker coordinate={{ latitude: currentLatitude, longitude: currentLongitude }} title="Hello" description="I am here" />
            </MapView>
            <View>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={{ width: '100%', height: '80%' }}>

                        <Input
                            inputContainerStyle={{ width: '75%' }}
                            containerStyle={{ marginBottom: 5 }}
                            placeholder='title'
                            onChangeText={(title) => setPoiTitle(title)}
                            value={poiTitle}

                        />
                        <Input
                            inputContainerStyle={{ width: '75%' }}
                            containerStyle={{ marginBottom: 5 }}
                            placeholder='description'
                            onChangeText={(description) => setPoiDescription(description)}
                            value={poiDescription}
                        />

                        <Button
                            title="Add POI"
                            onPress={() => poiAdditionHandler()}
                            buttonStyle={{ backgroundColor: "#eb4d4b" }}
                        />

                    </View>
                </Overlay>
            </View>

            <View style={{
                position: 'absolute',
                top: '95%',
                width: '100%'
            }}>
                <Button
                    disabled={addPOI}
                    title=" Add POI"
                    icon={{
                        name: 'map-marker',
                        type: 'font-awesome',
                        size: 20,
                        color: '#FFFFFF',
                    }}
                    buttonStyle={{ backgroundColor: "#eb4d4b", height: 45 }}
                    type="solid"
                    onPress={() => setAddPOI(!addPOI)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },
    textPrimary: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    textSecondary: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 17,
    },
});



function mapDispatchToProps(dispatch) {
    return {
        addMarkerToStore: function (coordinate, title, description) {
            dispatch({ type: 'addMarker', coordinate, title, description })
        }
    }
}

function mapStateToProps(state) {
    return { markerList: state.markers }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);