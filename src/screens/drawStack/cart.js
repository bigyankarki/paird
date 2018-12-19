import React from 'react';
import { StyleSheet, Platform, AsyncStorage, Image, Text, View, ScrollView } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements'
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

  calculate = () =>{
    let total = 0;
    this.state.val.map((val, index) => {
      total += (val.item_info.item_price* val.quantity);
    })
    return total;
  }

  render() {
    if(this.state.val){
      let subTotal = parseFloat(this.calculate().toFixed(2));
      let tax = parseFloat((subTotal*0.07).toFixed(2));
      let total = (subTotal+tax);
      return (
        <View>
        <ScrollView>
            {this.state.val.map((val, index) =>(
              <View style={{flexDirection:'row', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}} key={index} >
                <Card image={{uri:val.item_info.image_url}} imageStyle={{height:80,width:80, borderRadius:10}} containerStyle={{height:80}} >
                </Card>
                <Card containerStyle={{marginLeft:-18, width:180, borderColor:'white',justifyContent:'center', shadowColor:'rgba(0,0,0, 0)', elevation: 0}}>
                  <Text style={{fontWeight:'bold'}}> {val.business_name} </Text>
                  <Text> {val.item_info.item_name}</Text>
                  <Text> Quantity: {val.quantity}</Text>
                  <Text style={{color:'grey'}}> {val.notes}</Text>
                </Card>
                <Card containerStyle={{marginLeft:-20,  borderColor:'white', justifyContent:'center', shadowColor:'rgba(0,0,0, 0)', elevation:0}}>
                  <Text style={{color:'red'}}>${(val.item_info.item_price*val.quantity).toFixed(2)} </Text>
                </Card>
              </View>
            ))}
            <View style={{marginBottom:43, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', marginLeft:15, marginRight:15}}>
              <View>
              <Text style={{color:'grey'}}>Estimated Subtotal: </Text>
              <Text style={{color:'grey'}}>Estimated Tax: </Text>
              <Text style={{fontWeight:'bold'}}>Estimated Total: </Text>
              </View>
              <View>
                <Text style={{color:'grey'}}>{subTotal}</Text>
                <Text style={{color:'grey'}}>{tax}</Text>
                <Text style={{fontWeight:'bold'}}>{total}</Text>
              </View>
            </View>
        </ScrollView>
        <View style={{flexDirection: 'column', flex: 1}}>
          <Button raised backgroundColor='#f4511e' icon={{name: 'payment', color:'white'}} style={{alignSelf: 'center', position: 'absolute', bottom: 0, width: 500}} title='Checkout'/>
        </View>
        </View>
      );
    }
  }
}
