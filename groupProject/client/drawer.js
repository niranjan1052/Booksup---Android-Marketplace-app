
import React, { Component } from 'react';
import { Button, DrawerLayoutAndroid, Text, TextInput, View } from 'react-native';

export default class DrawerWithButton extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    this.refs['DRAWER_REF'].openDrawer();
  }

  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I am in the Drawer!</Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref={'DRAWER_REF'}>
        <View>
          <Button
            onPress={this.onPressButton}
            title="menu"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>

          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}
