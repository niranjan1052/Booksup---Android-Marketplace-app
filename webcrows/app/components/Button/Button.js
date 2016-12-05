'use strict'

import React, { Component } from 'react'

import {
  PropTypes,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import styles from './styles';

class Button extends Component {
  render() {
    let textStyle = [styles.buttonText, this.props.textStyle];

    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={() => this.onPress()}
        style={[styles.button, this.props.style]}
      >
        <Text style={textStyle}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }

  onPress() {
    if (this.props.enabled) {
      this.props.onPress();
    }
  }
}

Button.defaultProps = {
  onPress: () => {},
  style: {},
  textStyle: {},
  activeOpacity: 0.8,
  enabled: true
};

export default Button;
