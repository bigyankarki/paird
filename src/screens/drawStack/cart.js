import React from 'react';
import { StyleSheet, Platform, AsyncStorage, Image, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.reRender = this.props.navigation.addListener('willFocus',()=>{
      this.fetchDatabase();
    })
    //A react navigation lifecycle method to refresh a page after transition
    this.reRender = this.props.navigation.addListener('didFocus',()=>{
      this.fetchDatabase();
    })

    this.state = {
      val:[]
  }
  this.fetchDatabase = this.fetchDatabase.bind(this);
  this.handleRemoveAll = this.handleRemoveAll.bind(this);
}

  static navigationOptions = ({navigation}) => {
    return{
      title: 'Cart',
      headerRight: (
        <Icon raised name='delete'  color='red' onPress={navigation.getParam('handleRemove')} />
      ),
    }
  };

//Fucntion to remove entire item from the cart
  handleRemoveAll = async() =>{
    const uid = await AsyncStorage.getItem('userToken');
    const ref = firebase.firestore().collection('user').doc(uid);
    const FieldValue = firebase.firestore.FieldValue;
    ref.update({
      cartInfo: FieldValue.delete()
    }).then(()=>{
      this.fetchDatabase();
    }).catch((error)=>{
      console.log('Error removing the cartInfo');
    })
  }

//Fucntion to remove a single item
  handleRemove = async(index) =>{
    const uid = await AsyncStorage.getItem('userToken');
    const ref = firebase.firestore().collection('user').doc(uid);
    ref.get().then(refDoc =>{
      let cart = refDoc.data().cartInfo;
      cart.splice(index,1);
      if(cart.length!=0){
        ref.update({
          cartInfo: cart
        }).then(()=>{
          this.fetchDatabase();
        }).catch((error)=>{
          console.log("Failed Updating: "+error)
        })
      }
      //Rendering that the cart is empty
      else{
        ref.update({
          cartInfo: firebase.firestore.FieldValue.delete()
        }).then(()=>{
          this.fetchDatabase();
        }).catch((error)=>{
          console.log('Could not delete the order: '+error)
        })
      }
    })
  }

//Fetching the database and then updating the state value
  async fetchDatabase(){
    let user = {}
    const uid = await AsyncStorage.getItem('userToken');
     const ref = firebase.firestore().collection('user').doc(uid);
     ref.get().then(refDoc => {
       this.setState({val:refDoc.data().cartInfo})
     }).catch(error => console.log(`error: ${error}`))
  }

//A simple function to calculate the total price
  calculate = () =>{
    let total = 0;
    this.state.val.map((val, index) => {
      total += (val.item_info.item_price* val.quantity);
    })
    return total;
  }

//Allowing the button on na navigationOptions to interact with handleRemoveAll fucntion
  componentDidMount(){
    this.props.navigation.setParams({handleRemove: this.handleRemoveAll})
  }

  render() {
    if(this.state.val){
      let subTotal = parseFloat(this.calculate().toFixed(2));
      let tax = parseFloat((subTotal*0.07).toFixed(2));
      let total = (subTotal+tax).toFixed(2);
      const {navigation} = this.props;
      return (
        <View style={{flexDirection: 'column', flex: 1}}>
        <ScrollView>
            {this.state.val.map((val, index) =>(
              <TouchableHighlight key={index} onPress = { () => navigation.push('UpdateCart', {val:val, index:index})}>
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
                  <Icon raised name='delete' onPress={()=>this.handleRemove(index)}/>
                </View>
              </TouchableHighlight>
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
        <Button raised backgroundColor='#f4511e' icon={{name: 'payment', color:'white'}} buttonStyle={{marginLeft:-20,marginRight:-20, flex:0, alignItems:'stretch'}} title='Checkout'/>
        </View>
      );
    }
    else{
      return(
        <View>
          <Text>Your Cart Is Empty!! Keep Shopping...</Text>
        </View>
      )
    }
  }
}
