import React from 'react'
import {Dimensions, StyleSheet} from 'react-native'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Fonts = {
    logo: "Arial",
    general: "Roboto"
  };

const Colors = {
    primary: "rgb(42, 55, 68)",
    secondary: "rgb(130, 181, 65)",
    navBarBackground: "rgb(42, 55, 68)",
    navBarTitle: "white",
    lightBackground: "rgb(250, 250, 250)",
    mediumBackground: "rgb(240, 240, 240)",
    darkBackground: "rgb(200, 200, 200)"
  };

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
    loginButtonContainer: {
    marginTop: 5,
    width: windowWidth * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    width: windowWidth * 0.8,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.25)"
  },
  loginContainer: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  scrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: Colors.primary,
    overflow: "visible"
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Colors.primary
  },
  inputContainer: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "rgba(255,255,255,0.75)",
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.primary,
    color: "white",
    fontFamily: Fonts.general,
    fontSize: 16,
    padding: 5
  },
  logo: {
    width: windowWidth * 0.30,
    height: windowWidth * 0.30,
    borderRadius: 50
  },
  brandText: {
    color: "white",
    fontSize: 30,
    marginTop: 8,
    fontWeight: "600",
    fontFamily: Fonts.logo,
    marginBottom: 15
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    marginTop: 2,
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255, 0.2)"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)"
  },
  footerText: {
    color: "white",
    fontFamily: Fonts.general,
    fontSize: 14
  },
  footerActionText: {
    fontWeight: "600"
  }
})

module.exports = styles