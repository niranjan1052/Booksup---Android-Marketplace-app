import React, { Component } from 'react';
import { Text, Image, View, ListView, TouchableOpacity, Navigator } from 'react-native';

import { Container, Header, Content, Title, Button, Icon, Card, CardItem, Thumbnail, List, ListItem, InputGroup, Input} from 'native-base';
import ViewContainer from '../components/ViewContainer/ViewContainer';
import StatusBarBackground from '../components/StatusBarBackground/StatusBarBackground';
import FitImage from 'react-native-fit-image';
import styles from '../styles/appStyles';
import _ from 'lodash';
import ApiHandler from '../services/ApiHandler';

class MyUploads extends Component {
  constructor(props) {
    super (props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    console.log('Inside MyUploads Component - componentDidMount function');
    let self = this
    console.log('UserName: ', self.props.name);
    fetch('https://module4server.herokuapp.com/userposts/'+self.props.name, {
      method: 'GET'
    })
    .then (function(response) {
      return response.json()
    .then (function(json){
        console.log('Hit the API and response is : ',json.userPosts);
        if (json && json.flag==1 && json.userPosts) {
          self.setState({ books : json.userPosts})
        }
      });
    });
  }

  eachBook (book, self) {
    console.log('Inside MyUploads Component - eachBook function');
    return (<CardItem key={book.postId}>
              <Text> {book.title}</Text>
              <Text> {book.author} </Text>
              <Text> {`$ `} {book.askingPrice} </Text>
          </CardItem>
      )
  }

  render() {
    console.log('Inside MyUploads Component - Render function');
    return (
      <Container>
        <Content>
          <Header>
              <Button transparent onPress={ () => this.props.navigator.pop() }>
                  <Icon name='ios-arrow-back' />
                </Button>
          </Header>
          <Card>
              {this.state.books.map((item) => this.eachBook(item, this))}
          </Card>
        </Content>
      </Container>
    );
  }
}

module.exports = MyUploads
