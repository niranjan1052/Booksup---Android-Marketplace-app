import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Navigator,
  Button,
  TextInput
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

class Details extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
    this.price = ''
  }
  onPressHandler(){
    console.log('Button pressed');
    console.log('Bookdetails: ', this.props.bookdetails.items[0])
    //fetch('https://adityatest.herokuapp.com/addnewbook', {
    fetch('https://module4server.herokuapp.com/addnewbook', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookdetails : this.props.bookdetails.items[0],
        askingPrice: this.price,
        userName: "John"
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('POST response ',responseData.flag)
      })
      .done();

      Alert.alert(
        'Inserted into DB',
        'Can renavigate now'
      )
      this.goback()

  }
  goback(){
    console.log('Back Pressed')
    this.props.navigator.replacePrevious({
      rt : 'ScanCamera'
    })
    this.props.navigator.pop()
  }
  render(){
    console.log('item count ',this.props.bookdetails.totalItems)
    return (
      <View>
        {(this.props.bookdetails.totalItems==0)?
          <Text> No match for the barcode! </Text> :
          <View style={styles.container}>
            <Text> {this.props.bookdetails.items[0].volumeInfo.title} </Text>
            <Text>{this.props.bookdetails.items[0].volumeInfo.authors}</Text>
            <Text> {this.props.bookdetails.items[0].volumeInfo.industryIdentifiers[0].type} : {this.props.bookdetails.items[0].volumeInfo.industryIdentifiers[0].identifier} </Text>
            <TextInput
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                placeholder={'Extra Information'}
            />
            <Text> Selling Pice: </Text>
            <TextInput
              onChangeText = {(price) => this.price=price}
            />

          </View>
        }
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          onPress={this.goback.bind(this)}
          title="Scan Again"
          color="#841584"
        />
        <Button
          onPress={this.onPressHandler.bind(this)}
          title="Submit"
          color="#841584"
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sp: {
    padding : 10
  }
})

module.exports = Details;
