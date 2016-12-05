'use strict'

import React, { Component } from 'react'
import {
  DrawerLayoutAndroid,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
  Navigator,
  StyleSheet,
  navigationView
} from 'react-native'

import ApiHandler from '../services/ApiHandler'

import {
  Container,
  Content,
  Button,
  List,
  ListItem,
  Thumbnail,
  Icon,
  Header,
  Title,
  InputGroup,
  Input
} from 'native-base'

export default class Profile extends Component {
  constructor(props)  {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      books: []
    }

    this.onPressButton = this.onPressButton.bind(this);
  }

  componentDidMount() {
    let self = this
    fetch('https://module4server.herokuapp.com/explore', {
      method: 'GET'
    })
    .then (function(response) {
      return response.json()
    .then (function(json){
        if (json && json.flag==1 && json.allposts) {
          // self.setState({ crowsDS : self.state.crowsDS.cloneWithRows(json.allposts) })
          self.setState({ books : json.allposts })
        }
      });
    });
  }

  loadUser() {

    ApiHandler.getUser().user;
  }

  onPressButton() {
    this.refs['DRAWER_REF'].openDrawer();
  }

  eachBook (book, self) {
    //this.navigateToThisEvent.bind(this)
    return (<ListItem key={book}>
          <TouchableOpacity onPress={()=>self._navigateToThisEvent(book)}>
            <Thumbnail square size={100} source={{uri: book.imageLinks.thumbnail}} />
          </TouchableOpacity>
            <Text> {book.title}</Text>
            <Text> {book.author} </Text>
            <Text> {`$ `} {book.askingPrice} </Text>
          </ListItem>
      )
  }

  render () {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref={'DRAWER_REF'}>
        <Container>
          <Header searchBar rounded>
              <InputGroup>
                <Button transparent onPress={this.onPressButton}>
                  <Icon name="ios-menu" />
                </Button>
                <Icon name="ios-search" />
                <Icon placeholder="Search" />
              </InputGroup>
            <Button transparent>
              Search
            </Button>
          </Header>

          <View style={styles.body}>
            <View style={styles.profileView}>
              <Text style={styles.titleStyle}>My Books</Text>
              <Image
                source={require('../images/userIcon.png')}
                style={styles.userImage}
              />
              <Text ref={'loadUserTest'} style={styles.userName}>{this.props.name}</Text>
            </View>
          </View>
          <Content>
            <List>

              {this.state.books.map((item) =>
              this.eachBook(item, this)
            )}
            </List>
          </Content>
          </Container>
        </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: 'black',
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderBottomColor: 'black',

  },
  userImage: {
    borderRadius: 50,

  },
  userName: {
    color: 'black',
    marginBottom: 30,
  },
  titleStyle: {
    fontSize: 50,
    marginBottom: 30,
  }
});
