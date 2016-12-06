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
      filterText: ''
    }
    this.deletePost = this.deletePost.bind(this);
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

  deletePost(post, user)
  {
    console.log("postID ",post);
    console.log("user ",user);
    var books1 = this.state.books.filter(book => book.postId !== post);
    this.setState({books: books1});
    fetch('https://module4server.herokuapp.com/deletepost', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         postId: post
       })
     })
     .then( (response) => response.json() )
     .then((responseJson) => {
           interestflag = responseJson.flag;
         if (interestflag==1) {
             console.log('deleted successfully ', post)

               } else {
                   Alert.alert("delete operation failed")
               }
         });
  }


  eachBook (book, self) {
    console.log('Inside MyUploads Component - eachBook function');
    return (<CardItem key={book.postId}>
              <Thumbnail square size={100} source={{uri: book.imageLinks.smallThumbnail}} />
              <Text style= {{fontWeight: 'bold' }}> {book.title}</Text>
              <Text> {book.author} </Text>
              <Text> {`$ `} {book.askingPrice} </Text>
              <View style={{flexDirection:'row'}}>
                <Button danger onPress={() => this.deletePost(book.postId,this.props.name)} >
                  <Icon iconRight name='ios-close-circle' />
                </Button>
                <Text> </Text>
                <Button rounded info> Edit </Button>
            </View>
          </CardItem>
      )
  }

  render() {
    var filteredBooks = [];
    this.state.books.forEach((book) => {
      var bookvar = "" + book.postId
      if (bookvar.indexOf(this.state.filterText) === -1) {
        return;
      }
      else {
        filteredBooks.push(book);
      }
    });
    console.log('Inside MyUploads Component - Render function');
    return (
      <Container>
        <Content>
          <Header>
              <Button transparent onPress={ () => this.props.navigator.push({
                rt: "Home",
                name: this.props.name
              }) }>
                  <Icon name='ios-arrow-back' />
              </Button>
              <Title>My Uploads</Title>
          </Header>
          <Card>
              {filteredBooks.map((item) => this.eachBook(item, this))}
          </Card>
        </Content>
      </Container>
    );
  }
}

module.exports = MyUploads
