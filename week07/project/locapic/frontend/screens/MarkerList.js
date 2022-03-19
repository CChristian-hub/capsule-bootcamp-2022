import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MarkerList(props) {
    const [markerList, setMarkerList] = useState([])

    useEffect(() => {
        function loadMarkers() {
            AsyncStorage.getItem('pois', function (error, data) {
                let temp = JSON.parse(data);
                setMarkerList(temp);
            })
        }
        loadMarkers();
    }, []);

    const deleteMarker = (coord) => {
        //* Need test for map  // might need to modify useEffect in map // check if new addition and deletions are displayed
        console.log(coord)
        let temp = [...markerList]
        temp = temp.filter(e => e.coordinate.latitude !== coord.latitude && e.coordinate.longitude !== coord.longitude)
        AsyncStorage.setItem('pois', JSON.stringify(temp))
        setMarkerList(temp)
    }

    var markerArray = markerList.map((elem, i) => {
        return (
            //* Change handler to delete from local storage
            // <ListItem key={i} onPress={() => props.deleteMarker(elem.coordinate)}>
            <ListItem key={i} onPress={() => deleteMarker(elem.coordinate)}>
                <ListItem.Content>
                    <ListItem.Title>{elem.title}</ListItem.Title>
                    <ListItem.Subtitle>Coordinate: long:{elem.coordinate.longitude.toFixed(2)}, lat:{elem.coordinate.latitude.toFixed(2)} </ListItem.Subtitle>
                    <Text>{elem.description}</Text>
                </ListItem.Content>
            </ListItem>
        )
    })
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginTop: 50 }}>
                {markerArray}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapDispatchToProps(dispatch) {
    return {
        deleteMarker: function (coordinate) {
            dispatch({ type: 'deleteMarker', coordinate })
        }
    }
}
function mapStateToProps(state) {
    return { markerList: state.markers }
}
export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);