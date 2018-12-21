import React from 'react';
import { StyleSheet, AsyncStorage, Text, View, ScrollView,TouchableHighlight } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.reRender = this.props.navigation.addListener('willFocus',()=>{
      this.fetchDatabase();
    })
    this.state = {
      val: []
    }
    this.fetchDatabase = this.fetchDatabase.bind(this);
  }

  static navigationOptions = {
    title: 'Active Orders',
  };

  //Fetching the database and then updating the state value
  async fetchDatabase(){
    let user = {}
    const uid = await AsyncStorage.getItem('userToken');
     const ref = firebase.firestore().collection('user').doc(uid);
     ref.get().then(refDoc => {
       this.setState({val:refDoc.data().orderInfo})
     }).catch(error => console.log(`error: ${error}`))
  }

  render() {
    let orders = this.state.val
    console.log(orders)
    if(this.state.val){
      return (
        <ScrollView>
          {this.state.val.map((val, index) =>(
            <TouchableHighlight key={index} onPress = { () => alert("hi")}>
              <View key={index} >
                <Card>
                  <Text> Order from {orders[index].order[0].business_name}</Text>
                </Card>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      );
    } else{
      return (
        <Text>This is a order page.</Text>
      );
    }

  }
}
