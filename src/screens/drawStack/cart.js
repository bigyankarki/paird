import React from 'react';
import { StyleSheet, Platform, AsyncStorage, Image, Text, View, ScrollView } from 'react-native';
import { Card, ListItem, Icon, Divider } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.reRender = this.props.navigation.addListener('willFocus',()=>{
      this.fetchDatabase();
    })

    this.state = {
      val:[]
  }
  this.fetchDatabase = this.fetchDatabase.bind(this);
}

  static navigationOptions = {
    title: 'Cart',
  };

  async fetchDatabase(){
    let user = {}
    const uid = await AsyncStorage.getItem('userToken');
     const ref = firebase.firestore().collection('user').doc(uid);
     ref.get().then(refDoc => {
       this.setState({val:refDoc.data().cartInfo})
     }).catch(error => console.log(`error: ${error}`))
  }

  render() {
    if(this.state.val){
      console.log(this.state.val);
      return (
        <ScrollView>
            {this.state.val.map((val, index) =>(
              <View style={{flexDirection:'row', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}} key={index} >
                <Card image={{uri:val.item_info.image_url}} imageStyle={{height:80,width:80, borderRadius:10}} containerStyle={{height:80}} >
                </Card>
                <Card containerStyle={{marginLeft:-18, width:180, borderColor:'white',justifyContent:'center', shadowColor:'rgba(0,0,0, 0)'}}>
                  <Text> {val.business_name} </Text>
                  <Text> {val.item_info.item_name}</Text>
                  <Text> {val.quantity}</Text>
                  <Text> {val.notes}</Text>
                </Card>
                <Card containerStyle={{marginLeft:-20,  borderColor:'white', justifyContent:'center', shadowColor:'rgba(0,0,0, 0)'}}>
                  <Text style={{color:'red'}}>${val.item_info.item_price*val.quantity} </Text>
                </Card>
                <Divider style={{ backgroundColor: 'blue' }} />
              </View>
            ))}
        </ScrollView>
      );
    }
  }
}
