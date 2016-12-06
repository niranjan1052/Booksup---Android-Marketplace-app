import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
  Navigator,
} from 'react-native';

import Drawer from 'react-native-drawer'

import ApiHandler from '../services/ApiHandler'
import ViewContainer from '../components/ViewContainer/ViewContainer'
import Profile from './Profile'

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
  Input,
  Fab
} from 'native-base'

import styles from '../styles/appStyles'

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },
  body: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: 'black',
  },
  bgImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'transparent',
    resizeMode: 'stretch'
  },
  profileView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 125,
    borderBottomColor: 'black',
    marginBottom: 135
  },
  userImage: {
    borderRadius: 50,
  },
  userName: {
    color: 'black',
    marginBottom: 50,
    fontWeight: 'bold'
  },
  titleStyle: {
    fontSize: 50,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class Home extends Component {
  constructor(props) {
    super (props)
    this.state = {
      books: [],
      fabactive: true,
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
    }
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
          self.setState({ books : json.allposts })
        }
      });
    });
  }

  _navigateToThisEvent(book) {
    console.log(this.props.name)
    this.props.navigator.push({
      rt: "Entity",
      element: book,
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    })
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

  openProfile = () => {
    this._drawer.open()
  };

  fabPressed = () => {
    console.log('fab pressed..')
  }

  render() {
    console.log('Rendering..')

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
            content={<Profile name={this.props.name} styles={drawerStyles}/>}
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
        <Container>
          <Header searchBar rounded>
              <InputGroup>
                <Button transparent onPress={this.openProfile}>
                  <Icon name="ios-menu" />
                </Button>
                <Icon name="ios-search" />
                <Icon placeholder="Search" />
              </InputGroup>
            <Button transparent>
              Search
            </Button>
          </Header>

          <Content>
            <List>
              {this.state.books.map((item) =>
              this.eachBook(item, this)
            )}
            </List>
            <Fab active={this.state.fabactive}
                containerStyle={{ marginRight: 10 }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={ () => this.fabPressed }
            >
            <Icon name='ios-arrow-forward' />
            </Fab>
          </Content>
        </Container>
      </Drawer>
    );
  }
}

module.exports = Home
