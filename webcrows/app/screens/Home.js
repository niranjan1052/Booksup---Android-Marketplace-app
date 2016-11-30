import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  ListView,
  TouchableOpacity,
  Navigator
} from 'react-native';

import ViewContainer from '../components/ViewContainer/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground/StatusBarBackground'
import FitImage from 'react-native-fit-image';
import styles from '../styles/appStyles'

const entities = [
  {name: "To Kill a mocking bird", isbn: '9780446310789', url:"https://s-media-cache-ak0.pinimg.com/236x/a0/96/ff/a096ff3bafb7786b59ef9ba9d3e7ddf2.jpg"},
  {name: "The Book Thief", isbn: '9788868363048', url:"http://2.darkroom.stylist.co.uk/980/1961627cff1b988cee2f74cefb50cf7d:4d2312cb4f4e25f9aa8e2e911df35608/beautiful-book-covers"},
  {name: "Enchantment", isbn: '2', url:"http://www.creativindie.com/wp-content/uploads/2013/10/Enchantment-Book-Cover-Best-Seller1.jpg"},
  {name: "The Hobbit", isbn: '3', url:"https://cdn.pastemagazine.com/www/system/images/photo_albums/hobbit-book-covers/large/photo_5653_0-6.jpg?1384968217"},
  {name: "The Life of Pi", isbn: '4', url:"https://geekybooksnob.files.wordpress.com/2012/11/200px-life_of_pi_cover.png"}
]

class Home extends Component {

  constructor(props) {
    super (props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      crowsDS: ds.cloneWithRows(entities)
    }
  }

  render() {
    return (
      <ViewContainer name={this.props.name}>
        <StatusBarBackground style={{backgroundColor: 'mistyrose'}}/>
        <View style={styles.headerBlock}>
          <Text style={styles.header}>{`WebCrows`}</Text>
        </View>
        <ListView
          style={{marginTop: 5, marginBottom: 5}}
          dataSource={this.state.crowsDS}
          renderRow={(entity) => { return this._renderRow(entity) }} />
      </ViewContainer>
    );
  }

  _renderRow(entity) {
    return (
      <TouchableOpacity onPress={(event) => this._navigateToThisEvent(entity)}>
        <FitImage 
          source={{uri: entity.url}} 
          style={styles.frontContainer}
        />
      </TouchableOpacity>
    )
  }

  _navigateToThisEvent(entity) {
    this.props.navigator.push({
      rt: "Entity",
      element: entity,
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    })
  }
}

module.exports = Home