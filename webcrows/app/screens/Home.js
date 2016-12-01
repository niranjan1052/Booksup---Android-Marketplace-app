import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
  Navigator
} from 'react-native';

import ApiHandler from '../services/ApiHandler'
import ViewContainer from '../components/ViewContainer/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground/StatusBarBackground'
import FitImage from 'react-native-fit-image';

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

import styles from '../styles/appStyles'

class Home extends Component {
  constructor(props) {
    super (props)
    // this._navigateToThisEvent = this._navigateToThisEvent.bind(this)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      books: []
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
          // self.setState({ crowsDS : self.state.crowsDS.cloneWithRows(json.allposts) })
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
    return (<ListItem>
          <TouchableOpacity onPress={()=>self._navigateToThisEvent(book)}>
            <Thumbnail square size={100} source={{uri: book.imageLinks.thumbnail}} />
          </TouchableOpacity>
            <Text> {book.title}</Text>
            <Text> {book.author} </Text>
            <Text> {`$ `} {book.askingPrice} </Text>
          </ListItem>
      )
  }

  render() {
    console.log('Rendering')
    return (
      <Container>
        <Header searchBar rounded>
            <InputGroup>
              <Button transparent>
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
        </Content>
      </Container>
    );
  }
}

module.exports = Home
