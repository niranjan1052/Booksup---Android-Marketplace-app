import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Navigator
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

class ScanCamera extends Component{
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
      showCamera: true
    };
  }

  barcodeReceived(e) {
    this.setState({showCamera: false})
    console.log('flag', this.flag)
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
    var apiquery = "https://www.googleapis.com/books/v1/volumes?q="+e.data

    fetch(apiquery, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {

            this.props.navigator.push({
              rt: 'Details',
              bookdetails: responseData,
              name : this.props.name
            })
        })
        .done();



  }
  manualEntry(){
    this.setState({showCamera: false})
    this.props.navigator.push({
      rt: 'ManualISBN',
      name : this.props.name
    })
  }
  render(){
    if(this.state.showCamera){
      return (
        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        >
        <Text style={styles.capture} onPress={this.manualEntry.bind(this)}>Trouble Scanning?</Text>
        </BarcodeScanner>
      )
    }
    else {
      return (<View></View>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    marginRight: 110,
    marginLeft: 110,
    marginTop: 500,
  }
});


module.exports = ScanCamera
