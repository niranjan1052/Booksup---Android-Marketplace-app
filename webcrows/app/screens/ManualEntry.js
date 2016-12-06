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

class ManualEntry extends Component {
  constructor(props){
    super(props);
    this.isbn = '';
  }
  onPressHandler(){
    console.log('inside onPressHandler')
    var apiquery = "https://www.googleapis.com/books/v1/volumes?q="+this.isbn
    console.log('with manual isbn, i am going to query this: ', apiquery)
    fetch(apiquery, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            console.log('and I got this as response from google: ', responseData)
            this.props.navigator.push({
              rt: 'Details',
              bookdetails: responseData
            })
        })
        .done();
  }
  goback(){
    console.log('Back Pressed')
    this.props.navigator.replacePrevious({
      rt : 'First'
    })
    this.props.navigator.pop()
  }
  render(){
    return (
      <View>
      <Text>Please add the 13 digit ISBN number:</Text>
      <TextInput
        placeholder = "ISBN"
        onChangeText = {(isbn) => this.isbn=isbn}
      />
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

module.exports = ManualEntry
