'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import Drawer from 'react-native-drawer'
import Profile from '../../screens/Profile'
import styles from './styles'

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

class ViewContainer extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	      drawerType: 'overlay',
	      openDrawerOffset:100,
	      closedDrawerOffset:0,
	      panOpenMask: .1,
	      panCloseMask: .9,
	      relativeDrag: false,
	      panThreshold: .25,
	      tweenHandlerOn: false,
	      tweenDuration: 350,
	      tweenEasing: 'linear',
	      disabled: false,
	      tweenHandlerPreset: null,
	      acceptDoubleTap: false,
	      acceptTap: false,
	      acceptPan: true,
	      tapToClose: false,
	      negotiatePan: false
	    };
	}

	closeProfile = () => {
		this._drawer.close()
	};
	openProfile = () => {
		this._drawer.open()
	};
	render() {
		return (
			<Drawer
				ref={(ref) => this._drawer = ref}
        		animation={this.state.animation}
        		openDrawerOffset={this.state.openDrawerOffset}
        		closedDrawerOffset={this.state.closedDrawerOffset}
        		panOpenMask={this.state.panOpenMask}
        		panCloseMask={this.state.panCloseMask}
        		relativeDrag={this.state.relativeDrag}
        		panThreshold={this.state.panThreshold}
        		content={<Profile name={this.props.name} />}
        		styles={drawerStyles}
        		disabled={this.state.disabled}
        		acceptDoubleTap={this.state.acceptDoubleTap}
        		acceptTap={this.state.acceptTap}
        		acceptPan={this.state.acceptPan}
        		tapToClose={this.state.tapToClose}
        		negotiatePan={this.state.negotiatePan}
        		changeVal={this.state.changeVal}
        		side={'left'}
			>
				<View style={styles.viewContainer}>
					{this.props.children}
				</View>
			</Drawer>
			)
	}	
}

module.exports = ViewContainer