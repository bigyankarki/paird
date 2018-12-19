import React from 'react';
import { StyleSheet, Platform, AsyncStorage, Image, Text, View, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val:[]
  }
}

  static navigationOptions = {
    title: 'Cart',
  };

  async componentDidMount(){
    let user = {}
    const uid = await AsyncStorage.getItem('userToken');
     const ref = firebase.firestore().collection('user').doc(uid);
     ref.get().then(refDoc => {
       this.setState({val:refDoc.data().cartInfo})
     }).catch(error => console.log(`error: ${error}`))
  }

  render() {
    if(this.state.val){
      return (
        <ScrollView>
            {this.state.val.map((val, index) =>(
              <View style={{flexDirection:'row', flexWrap:'wrap'}} key={index}>
                <Card image={{uri:val.item_info.image_url}} imageStyle={{height:80,width:80, borderRadius:10}} containerStyle={{height:80}} >
                </Card>
                <Card containerStyle={{marginLeft:-20, width:200, borderColor:'white'}}>
                  <Text> {val.business_name} </Text>
                  <Text> {val.item_info.item_name}</Text>
                  <Text> {val.quantity}</Text>
                  <Text> {val.notes}</Text>
                </Card>
              </View>
            ))}
        </ScrollView>
      );
    }
  }
}
