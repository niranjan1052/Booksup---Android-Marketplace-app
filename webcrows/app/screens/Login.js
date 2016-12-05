import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import ApiHandler from '../services/ApiHandler'
import ViewContainer from '../components/ViewContainer/ViewContainer'
import Button from '../components/Button/Button'
import styles from '../styles/appStyles'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignup: false };

    this.email = null;
    this.contact = null;
    this.name = null;
    this.password = null;
    this.passwordConfirmation = null;
    this.onLoadUserCompleted = this.onLoadUserCompleted.bind(this)
    this._navigateToHome = this._navigateToHome.bind(this)
  }

  componentDidMount() {
    ApiHandler.loadUser()
      .then( (user)=> {
        onLoadUserCompleted(user)
      } )
      .catch(( )=>{});
  }

  render() {
    let footerText = this.state.isSignup ? (
      <Text style={styles.footerText}>
        Already signed up? <Text style={styles.footerActionText}>Login.</Text>
      </Text>
    ) : (
      <Text style={styles.footerText}>
        Dont have an account? <Text style={styles.footerActionText}>Sign Up.</Text>
      </Text>
    );

    return (
      <View style={styles.loginContainer}>
        <ScrollView
          ref="scrollView"
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
          style={styles.scrollView}
        >
          <View style={styles.innerContainer}>
            <Image source={require("../images/booksup.jpg")} style={styles.logo} />
            <Text style={styles.brandText}>BooksUp</Text>
            {this.renderForm()}
          </View>
          <View style={styles.horizontalLine} />
          <TouchableOpacity style={styles.footer} activeOpacity={0.8} onPress={() => this.changeSignup()}>
            {footerText}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }


  renderForm() {
    let passwordConfirmationField = this.state.isSignup ? (
      <View style={styles.inputContainer}>
        <TextInput
          ref={(ref) => this._passwordConfirmationRef = ref}
          placeholder="Password Confirmation"
          placeholderTextColor="rgba(255,255,255,0.75)"
          secureTextEntry={true}
          selectionColor="white"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(password) => this.passwordConfirmation = password}
          returnKeyType="go"
          onSubmitEditing={() => this.submitForm()}
        />
      </View>
    ) : null;

    let contactDetails = this.state.isSignup ? (
        <View>
         <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.75)"
            keyboardType="email-address"
            selectionColor="white"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email) => this.email = email}
            returnKeyType="next"
            onSubmitEditing={() => this._contactRef.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(ref) => this._contactRef = ref}
            placeholder="Contact number"
            placeholderTextColor="rgba(255,255,255,0.75)"
            keyboardType="phone-pad"
            selectionColor="white"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(contact) => this.contact = contact}
            returnKeyType="next"
            onSubmitEditing={() => this._nameRef.focus()}
          />
        </View>
      </View>
    ) : null;

    return (
      <View>
        {contactDetails}
        <View style={styles.inputContainer}>
          <TextInput
            ref={(ref) => this._nameRef = ref}
            placeholder="Username"
            placeholderTextColor="rgba(255,255,255,0.75)"
            keyboardType="default"
            selectionColor="white"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(name) => this.name = name}
            returnKeyType="next"
            onSubmitEditing={() => this._passwordRef.focus()}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(ref) => this._passwordRef = ref}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.75)"
            secureTextEntry={true}
            selectionColor="white"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(password) => this.password = password}
            returnKeyType={this.state.isSignup ? "next" : "go"}
            onSubmitEditing={() => this.state.isSignup ? this._passwordConfirmationRef.focus() : this.submitForm()}
          />
        </View>
        {passwordConfirmationField}
        <View style={styles.loginButtonContainer}>
          <Button
            onPress={() => this.submitForm()}
            textStyle={{fontSize: 14}}
            style={styles.loginButton}
          >
            {this.state.isSignup ? "Sign Up" : "Login"}
          </Button>
        </View>
      </View>
    );
  }

  submitForm() {
    if (this.state.isSignup) {
      if (!this.name || !this.contact || !this.email || !this.password || !this.passwordConfirmation)
        Alert.alert("Missing input fields");
      if (this.password !== this.passwordConfirmation)
        Alert.alert("Passwords don't match");

      ApiHandler.signup({
        email: this.email,
        contact: this.contact,
        name: this.name,
        password: this.password
      }, this.onLoadUserCompleted);
    } else {
      ApiHandler.login({
        name: this.name,
        password: this.password
      }, this.onLoadUserCompleted);
    }
  }

  changeSignup() {
    this.setState({ isSignup: !this.state.isSignup });
  }


  onLoadUserCompleted(user) {
    console.log('onLoadUserCompleted ' + user)
    if (user) {
      this._navigateToHome(user)
    }
  }

  _navigateToHome(user) {
    this.props.navigator.push({
      rt: "Profile",
      name: user
    })
  }

}

module.exports = Login
