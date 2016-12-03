import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
  Navigator
} from 'react-native';

var navigationView = (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I am the Drawer!</Text>
  </View>
);

module.exports = navigationView
