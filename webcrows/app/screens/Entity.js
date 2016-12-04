import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Container, Header, Content, Title,Button, Icon,Card, CardItem, Thumbnail } from 'native-base';
import ViewContainer from '../components/ViewContainer/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground/StatusBarBackground'
import FitImage from 'react-native-fit-image';
import styles from '../styles/appStyles'
import _ from 'lodash'
//import Icon from 'react-native-vector-icons/FontAwesome'

export default class Entity extends Component {
  constructor(props) {
    super (props)
    // this._navigateToThisEvent = this._navigateToThisEvent.bind(this)

    this.state = {
      bookdetail: this.props.element
    }
  //  this.onPressButton = this.onPressButton.bind(this);
  }

	render() {
		return (
      <Container>
                <Content>
                <Header>


                    <Button transparent onPress={ () => this.props.navigator.pop() }>
                        <Icon name='ios-arrow-back' />
                      </Button>
                    <Title>Book Details</Title>

                    <Button transparent>
                        <Icon name='ios-menu' />
                    </Button>
                </Header>
                        <View style={{ flex: 1 }}>

                              <Text> {this.props.element.title } </Text>
                              <Text> Publisher: {this.props.element.publisher } </Text>
                              <Text> ISBN: {this.props.element.isbn } </Text>




                            <Image source={{uri: this.props.element.imageLinks.thumbnail}} style={{margin:20, alignSelf:'center',width:200,height:200}} />
                            <Text></Text>

                            <Text style={{borderWidth :2}}>
                             {this.props.element.description}
                            </Text>
                            <Text></Text>
                            <Button rounded style={{alignSelf:'center'}} >

                              Interested to Buy
                            </Button>

 </View>
                </Content>
            </Container>


			)
	}
}
