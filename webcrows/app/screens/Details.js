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
import { H3 , Container} from 'native-base';

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
        userName: this.props.name,
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
        'Upload Successful',
        'Book has been put up for sale'
      )
      this.props.navigator.push({
        rt: "Home",
        name: this.props.name
      })

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
      <Container>
      <View>
        {(this.props.bookdetails.totalItems==0)?
          <H3> No match for the barcode! </H3> :
          <View style={styles.container}>
            <H3 style={{ alignSelf:'center' }} > {this.props.bookdetails.items[0].volumeInfo.title} </H3>
            <Text></Text>
            <Text>Author(s): {this.props.bookdetails.items[0].volumeInfo.authors}</Text>
            <Text></Text>
            <Text> {this.props.bookdetails.items[0].volumeInfo.industryIdentifiers[0].type} : {this.props.bookdetails.items[0].volumeInfo.industryIdentifiers[0].identifier} </Text>
            <Text></Text>
            <Text></Text>
              <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 2}}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  placeholder={'Enter additional information'}
                  multiline = {true}
                  numberOfLines = {3}
              />
            <Text></Text>
            <Text></Text>
            <Text> Selling Pice: </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 2}}
              onChangeText = {(price) => this.price=price}
            />
            <Text></Text>
            <Text></Text>
            {!this.state.pictaken?
              <Button
                onPress={this.takepic.bind(this)}
                title="Upload Picture"
                color="#841584"
                style={{ alignSelf:'center' }}
              />
            :
              <View style={styles.container}>
              <Image
                style={{width: 100, height: 100, alignSelf:'center'}}
                source={{uri: this.imgurl}}
              />
              </View>
            }
          </View>
        }
        <Text></Text>
        <Text></Text>
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
    </Container>
    )
  }
}

const styles = StyleSheet.create({
  sp: {
    padding : 10
  },
  container: {

  },
  textbox: {
    alignSelf : 'flex-start',
  }
})

module.exports = Details;
