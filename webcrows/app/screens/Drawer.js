import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
  Navigator,
  Button
} from 'react-native';



var navigationView = (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I am the Drawer!</Text>
    <Button title="Profile"  onPress={()=>_profile()}>
    </Button>
  </View>
);


module.exports = navigationView
