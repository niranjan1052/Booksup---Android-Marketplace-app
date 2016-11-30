import React from 'react'
import {Dimensions, StyleSheet} from 'react-native'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  navStyles: {
  	backgroundColor: 'lightgrey'
  },
  backgroundImage: {
		flex: 1,
		width: null,
		height: null
  },
  picsRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aliceblue',
  },
  frontContainer: {
  	flexDirection: 'row',
  	borderRadius: 20,
  	marginTop: 10,
    marginLeft: windowWidth*0.1,
    alignItems: 'center',
    width: windowWidth*0.8,
    height: windowHeight*0.75
  },
  singlePic: {
    flex: 1
  },
  headerBlock: {
    backgroundColor: 'coral',
    marginBottom: 3,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333'
  },
  closeEntity: {
  	color: 'red',
  	textAlign: 'right',
  	fontSize: 30,
    fontWeight: '900'
  },
  loginContainer: {

  },
  innerContainer: {

  },
  logo: {
    width: 50,
    height: 50
  },
  brandText: {

  },
  horizontalLine: {

  },
  scrollView: {

  },
  footer: {

  },
  inputContainer: {

  },
  input: {

  },
  loginButtonContainer: {

  },
  loginButton: {

  }
})

module.exports = styles