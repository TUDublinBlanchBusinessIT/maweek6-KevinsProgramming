import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import Swiper from 'react-native-swiper';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PersonalInfo from './components/PersonalInfo';
import MovieBooking from './components/MovieBooking';

export default function App() {
  
  var uuid = Crypto.randomUUID();

  
  const [booking, setBooking] = useState({
    bookDate: "2000-02-02",
    movieTitle: "",
    numberOfSeats: 0,
    balcony: 0,
  });


  async function saveData() {
    const uuid = Crypto.randomUUID(); 
    await AsyncStorage.setItem(uuid, JSON.stringify(booking));
    alert("Saved with UUID: " + uuid);
    Alert.alert("Saved with UUID: " + uuid);
  }

  
  async function getData() {
    try {
      let thisBooking = await AsyncStorage.getItem(uuid);
      let parsedBooking = JSON.parse(thisBooking);
      if (parsedBooking) {
        Alert.alert("Movie Title: " + parsedBooking.movieTitle);
      } else {
        Alert.alert("No booking found for this UUID.");
      }
    } catch (error) {
      Alert.alert("Error getting data: " + error.message);
    }
  }

  return (
    <View style={styles.screencontainer}>
      <View style={styles.imgview}>
        <Image source={require('./assets/moviesV3.png')} />
      </View>

      <Swiper showsButtons={true}>
        <PersonalInfo screenstyle={styles.screen} data={booking} setData={setBooking} />
        <MovieBooking screenstyle={styles.screen} data={booking} setData={setBooking} />
      </Swiper>

      
      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Save Data</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.button} onPress={getData}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Get Data</Text>
      </TouchableOpacity>
    </View>
  );
}

var width = Dimensions.get('window');

const styles = StyleSheet.create({
  imgview: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 0.5,
    marginTop: "8%",
  },
  screencontainer: {
    flexDirection: "column",
    flex: 1,
    padding: "1%",
    backgroundColor: "lightgrey",
  },
  screen: {
    flex: 1,
    alignItems: "start",
    padding: "10%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
});
