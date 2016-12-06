'use strict'

import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import ApiHandler from '../services/ApiHandler'

export default class Profile extends Component {
  constructor(props)  {
    super(props)
    this.onLogoutCompleted.bind(this);
  }

  _logout() {
    console.log('user pressed logout button')
    ApiHandler.logout({
      name: 'anon'
    }, () => {console.log('logout callback completed')})
    this.onLogoutCompleted()
  }

  render () {
    return (
      <View>
      <Text>{`Profile content`}</Text>
      <Button title="Logout"  onPress={() => this._logout()} />
      </View>
    )
  }

  onLogoutCompleted() {
    console.log('onLogoutCompleted is called')
    this.props.navigator.popToTop();
  }
}
