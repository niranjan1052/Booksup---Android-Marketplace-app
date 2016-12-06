import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Navigator
} from 'react-native';
import { Container, Header, Content, Title,Button, Icon,Card, CardItem, Thumbnail } from 'native-base';
import ViewContainer from '../components/ViewContainer/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground/StatusBarBackground'
import FitImage from 'react-native-fit-image'
import styles from '../styles/appStyles'



import _ from 'lodash'

export default class MyInterests extends Component {

  constructor(props) {
    super (props)
    // this._navigateToThisEvent = this._navigateToThisEvent.bind(this)

    this.state = {
      interestlist:[] ,
      user: this.props.name
    }
   this.gotoEntity= this.gotoEntity.bind(this);
  }

  componentDidMount() {
    let self = this

    let url = 'https://module4server.herokuapp.com/myinterests/'+this.state.user;
    console.log("load url ",url);
    fetch(url , {
      method: 'GET'
    })
    .then( (response) => response.json() )
    .then((responseJson) => {
          flag1 = responseJson.flag;
          console.log('list of interests fetched with flag  ', flag1)
        if (flag1==1) {
            console.log('list of books ', responseJson.interestedbooks );
              self.setState({ interestlist : responseJson.interestedbooks })
              console.log("after set state ", this.state.interestlist);
              } else {
                  Alert.alert("fetch error")
              }
        })
  }

gotoEntity(book){
  this.props.navigator.push({
    rt: "Entity",
    element: book,
    name:this.props.name,
    sceneConfig: Navigator.SceneConfigs.FloatFromRight
  })

}
eachBook (book, self) {

  console.log('Rendering ', book.title)
  return (
     <CardItem key={book.postId} button onPress={() => this.gotoEntity(book)}>
        <Thumbnail source={{uri: book.imageLinks.thumbnail}} />
        <Text>{book.title }</Text>

    </CardItem>



    )
}

  render() {
         return (
             <Container>
                 <Content>
                 <Header>
                     <Button transparent onPress={ () => this.props.navigator.pop() }>
                         <Icon name='ios-arrow-back' />
                       </Button>
                     <Title>List of Books i liked</Title>
                 </Header>

                     <Card style={{margin:3}}>

                     {this.state.interestlist.map((item) =>
                     this.eachBook(item, this)
                       )}



                    </Card>
                 </Content>
             </Container>
         );
     }






}
