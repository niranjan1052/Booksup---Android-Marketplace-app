'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles'

class StatusBarBackground extends Component {
	render() {
		return (
			<View style={[styles.statusBarBackground, this.props.style || {}]}>
			</View>
			)
	}
}

module.exports = StatusBarBackground