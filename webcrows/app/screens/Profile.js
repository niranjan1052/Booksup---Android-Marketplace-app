'use strict'

import React, { Component } from 'react'
import {
  DrawerLayoutAndroid,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
  navigationView
} from 'react-native'

import {
  Container,
  Header,
  Content,
  Button,
  Card,
  CardItem,
  Icon
} from 'native-base'

export default class Profile extends Component {
  constructor(props)  {
    super(props)
  }

  loadMyInterests() {
    console.log('loading my interests..');
    this.props.navigator.push({
      rt: "MyInterests",
      name: this.props.name
    })
  }

  loadMyUploads() {
    this.props.navigator.push({
      rt: "MyUploads",
      name: this.props.name
    })
  }

  render () {
    return (
          <Container>
          <Content contentContainerStyle={{ flex : 0, justifyContent: 'center' }}>
          <View style={this.props.styles.body}>
            <Image  source={require('../images/swirls.jpg')} style={this.props.styles.bgImage}>
              <Text style={this.props.styles.titleStyle}>BooksUp!</Text>
              <Image
                source={require('../images/userIcon.png')}
                style={this.props.styles.userImage}
              />
              <Text ref={'loadUserTest'} style={this.props.styles.userName}>{this.props.name}</Text>
            </Image>
            <View style={this.props.styles.profileView}>
                <Text> My Shelf </Text>
                <Button rounded onPress={this.loadMyInterests}> Interests </Button>
                <Button rounded onPress={this.loadMyUploads}> Uploads </Button>
            </View>
          </View>
          </Content>
          </Container>
    );
  }
}