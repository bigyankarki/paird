import React from 'react';
import { StyleSheet, Platform, ToastAndroid, AsyncStorage, Image, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements'
import { PaymentRequest } from 'react-native-payments';
import firebase from 'react-native-firebase';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.reRender = this.props.navigation.addListener('willFocus',()=>{
      this.fetchDatabase();
    })
    this.reRender = this.props.navigation.addListener('didFocus',()=>{
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

  handleCheckOut = (total) => {
    // visit documentation @ https://github.com/naoufal/react-native-payments#demo
    // for stripe config: https://github.com/naoufal/react-native-payments/tree/master/packages/react-native-payments-addon-stripe

    // total amount in cents
    let total_amount = (total * 100).toFixed(0)
    // define method_data for android payment
    const METHOD_DATA = [{
      supportedMethods: ['android-pay'],
      data: {
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        currencyCode: 'USD',
        environment: 'TEST', // defaults to production
        paymentMethodTokenizationParameters: {
          tokenizationType: 'GATEWAY_TOKEN',
          parameters: {
            gateway: 'stripe',
           'stripe:publishableKey': 'pk_test_lfiwakWUPv90N7Ayv465F67O',
           'stripe:version': '5.0.0' // Only required on Android
          }
        }
      }
    }];

    const DETAILS = {
			  id: 'basic-example',
			  displayItems: [
			    {
			      label: 'Movie Ticket',
			      amount: { currency: 'USD', value: '0.01' }
			    }
			  ],
			  total: {
			    label: 'Merchant Name',
			    amount: { currency: 'USD', value: '0.01' }
			  }
			};


			const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS)

      paymentRequest.show().then(paymentResponse => {
      const { getPaymentToken } = paymentResponse.details;
      return getPaymentToken()
        .then(paymentToken => {
          fetch('https://pairdserver.herokuapp.com/api/doPayment/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount : total_amount,
            tokenId : 'tok_visa' // replace with tokenId while in production
          })
          })
          .then(res => res.json())
          .then(resJson => {
            console.log("successful transaction")
            ToastAndroid.show('Payment successful', ToastAndroid.SHORT);
            paymentResponse.complete('success');
          })
          .catch(error => {
            console.log("error is"+ error)
            ToastAndroid.show('Payment Unsuccessful', ToastAndroid.SHORT);
            paymentResponse.complete('fail');
          })
        })
      }).catch(error => {
        console.log("payment cancelled")
        ToastAndroid.show('Payment Cancelled', ToastAndroid.SHORT);
      })

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
        <Button raised backgroundColor='#f4511e' icon={{name: 'payment', color:'white'}} buttonStyle={{marginLeft:-20,marginRight:-20, flex:0, alignItems:'stretch'}} title='Checkout' onPress={() => this.handleCheckOut(total)}/>
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
