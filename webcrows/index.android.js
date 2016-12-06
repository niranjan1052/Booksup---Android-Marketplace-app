import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text
} from 'react-native'

import Home from './app/screens/Home'
import Entity from './app/screens/Entity'
import Login from './app/screens/Login'
import styles from './app/styles/appStyles'
import ScanCamera from './app/screens/ScanCamera'
import Details from './app/screens/Details'
import ManualEntry from './app/screens/ManualEntry'
import AddCamera from './app/screens/AddCamera'

export default class webcrows extends Component {

  _renderScene(route, navigator) {
    var globalNavProps  = { navigator }

    switch(route.rt) {
      case "Login":
        return (
            <Login {...globalNavProps}
              key = {route.rt}/>
          )

      case "Home":
        return (
            <Home {...globalNavProps}
             key={route.rt}
             name={route.name}
            />
          )

      case "Entity":
        return (
            <Entity
              {...globalNavProps}
              key = {route.rt}
              element={route.element}
              name={route.name}
            />
          )

      case "Temp":
        return (
            <Text>{`a temp route..`}</Text>
          )
      case 'Details':
        return (
          <Details {...globalNavProps} bookdetails={route.bookdetails} name ={route.name}/>
        )
      case 'ManualISBN':
        return (<ManualEntry {...globalNavProps} name={route.name}/>)

      case 'ScanCamera':
        return(
          <ScanCamera {...globalNavProps} name={route.name}/>
        )
      case 'AddPic':
        return(
          <AddCamera {...globalNavProps} route={route} name={route.name}/>
        )

      default:
        return (
            <Home {...globalNavProps}
             key={route.rt}
             name={route.name}
            />
          )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{rt: "Login",name:""}}
        ref="appNavigator"
        style={styles.navStyles}
        renderScene={this._renderScene }
        configureScene={ (route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight,
          gestures: route.gestures
        }) }
      />
    );
  }
}

AppRegistry.registerComponent('webcrows', () => webcrows);
