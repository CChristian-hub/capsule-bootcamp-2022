import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';
import { Button, Overlay, ListItem } from 'react-native-elements';

import MapView, { Marker } from 'react-native-maps';


export default function App() {
  const [contacts, setContacts] = useState([])
  const [myPos, setMyPos] = useState({})
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await Contacts.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      if (1) {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Addresses],
        });
        let mypos = await Location.geocodeAsync('Paris')
        setMyPos({ lat: mypos[0].latitude, long: mypos[0].longitude })

        let tab = []
        for (const elem of data) {
          if (elem.addresses !== undefined) {
            let coord = await Location.geocodeAsync(elem.addresses[0].city)
            let distance = calcCrow(myPos.lat, myPos.long, coord[0].latitude, coord[0].longitude)
            tab.push({ name: elem.name, address: elem.addresses[0].city, coordinate: { lat: coord[0].latitude, long: coord[0].longitude }, distanceToMe: distance })
          }
        }
        setContacts(tab)
      }
    })();
  }, []);


  console.log(contacts)


  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  function toRad(Value) {
    return Value * Math.PI / 180;
  }

  let tab2 = [...contacts]
  tab2 = tab2.sort((function (a, b) { return a.distanceToMe - b.distanceToMe }))
  let tab3 = tab2.map((elem, i) => {
    return (
      <ListItem key={i}>
        <ListItem.Content>
          <ListItem.Title>{elem.name}</ListItem.Title>
          <ListItem.Subtitle>{elem.distanceToMe.toFixed(1)} km</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
  })
  let tab = contacts.map((elem, i) => {
    return (
      <Marker key={i} coordinate={{ latitude: elem.coordinate.lat, longitude: elem.coordinate.long }}
        title={elem.name}
      />
    )
  })

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} >
        {tab}
      </MapView>
      <View style={{
        position: 'absolute',
        top: '95%',
        width: '100%'
      }}>

        <Overlay overlayStyle={{ width: '80%' }} isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={{ width: '100%', height: '80%' }}>
            <ScrollView style={{ flex: 1, marginTop: 50 }}>
              {tab3}
            </ScrollView>
            <Button
              title="Add POI"
              onPress={() => toggleOverlay()
              }
              buttonStyle={{ backgroundColor: "#eb4d4b" }}
            />
          </View>
        </Overlay>
        <Button
          title="Check Contact Distance"
          buttonStyle={{ backgroundColor: "#eb4d4b", height: 45 }}
          type="solid"
          onPress={() => toggleOverlay()}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
