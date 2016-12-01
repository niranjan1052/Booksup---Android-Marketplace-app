import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import ViewContainer from '../components/ViewContainer/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground/StatusBarBackground'
import FitImage from 'react-native-fit-image';
import styles from '../styles/appStyles'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Entity extends Component {
	render() {
		return (
			    <ViewContainer name={this.props.name}>
			        <StatusBarBackground style={{backgroundColor: 'mistyrose'}}/>
			        <TouchableOpacity onPress={ () => this.props.navigator.pop() }>
			        	<Icon name="circle" style={styles.closeEntity} />
			        </TouchableOpacity>
			        <View style={styles.headerBlock}>
			          <Text style={styles.header}>{_.capitalize(this.props.element.title)}</Text>
			        </View>
			          <FitImage
			          	source={{uri: this.props.element.imageLinks.thumbnail}}
			          	style={styles.singlePic}
			          />
			    </ViewContainer>
			)
	}
}
