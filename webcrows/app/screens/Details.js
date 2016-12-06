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
  TextInput,
  Image
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

class Details extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      pictaken: false,
    }
    this.price = ''
    this.imgurl = ''
  }
  onPressHandler(){
    console.log('Button pressed');
    console.log('Bookdetails: ', this.props.bookdetails.items[0])
    console.log('will be sending ',this.imgurl)
    fetch('https://module4server.herokuapp.com/addnewbook', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookdetails : this.props.bookdetails.items[0],
        askingPrice: this.price,
        userName: "John",
        imgurUrl : this.imgurl,
        sellerNotes: this.state.text
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
  takepic(){
    console.log('Will take pic')
    this.setState({
      pictaken: true
    })
    this.props.navigator.push({
      rt : 'AddPic',
      selfvar : this
    })
  }
  callbackAddCamera(url){
    console.log('called callback')
    console.log('url is ', url)
    this.imgurl = url
    console.log('price is ',this.price)
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
                  style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  placeholder={'Extra Information'}
                  multiline = {true}
                  numberOfLines = {4}
              />
            <Text> Selling Pice: </Text>
            <TextInput
              onChangeText = {(price) => this.price=price}
            />
            {!this.state.pictaken?
              <Button
                onPress={this.takepic.bind(this)}
                title="Upload Picture"
                color="#841584"
              />
            :
              <View style={styles.container}>
              <Text>Image URL: {this.imgurl}</Text>
              <Image
                style={{width: 100, height: 100}}
                source={{uri: this.imgurl}}
              />
              </View>
            }
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
  },
  container: {
    alignItems: 'center'
  },
  textbox: {
    alignSelf : 'flex-start',
  }
})

module.exports = Details;
