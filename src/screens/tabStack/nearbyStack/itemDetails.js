import React from 'react';
import { StyleSheet, AsyncStorage, Platform, TextInput, ActivityIndicator, StatusBar, Image, Text, View, ScrollView, ImageBackground, ToastAndroid } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeInfo: {},
      item : {},
      quantity : 1,
      notes : ''
    };
  }

  // Set navigation title.
  static navigationOptions = ({ navigation }) => {
    let item = navigation.getParam('item', 'Item')
    return {
      title: `${item.item_name}`
    };
  };

  // ComponentDidMount
  componentDidMount = () => {
    let item = this.props.navigation.getParam('item', 'NO-ITEM-DEFAULT')
    let storeInfo = this.props.navigation.getParam('storeInfo', 'NO-ITEM-DEFAULT')
    this.setState({item: item, storeInfo : storeInfo})

  }

  // handle quantity add button
  handleAdd = () => {
    var quantity = this.state.quantity + 1;
    this.setState({quantity: quantity})
  }

  // handle quantity remove button.
  handleRemove = () => {
    if(this.state.quantity > 1){
      var quantity = this.state.quantity - 1;
      this.setState({quantity: quantity})
    }
  }

  // handle input quantity changes.
  handleInput = (num) => {
    let quantity = parseInt(num)
    if(quantity && quantity > 0){
      this.setState({quantity: quantity})
    }
  }

  // handle submit button
  handleSubmit = async () => {
    const { navigation } = this.props;
    let orderInfo = {
      item_info: this.state.item,
      quantity: this.state.quantity,
      notes: this.state.notes,
      business_name: this.state.storeInfo.business_name,
      business_address: this.state.storeInfo.business_address
    }

    const userToken = await AsyncStorage.getItem('userToken')
    const ref = await firebase.firestore().collection('user').doc(userToken)
    // add cart to database.
      ref.update({
        cartInfo: firebase.firestore.FieldValue.arrayUnion(orderInfo)
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

    ToastAndroid.show('Added to Cart.', ToastAndroid.SHORT);

    navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    let item = this.state.item

    if (!Object.keys(item).length == 0){
      //---------------------------------------------------------------------
      return (
        <ScrollView>

        <ImageBackground source={{uri: item.image_url}} style={{flex:0, justifyContent: 'center', alignItems:'stretch', height: 150}}>
            <Text style={styles.item_name}>{item.item_name}</Text>
            <Text style={styles.item_description}>{item.item_description}</Text>
            <Text style={styles.item_description}>${item.item_price}</Text>
        </ImageBackground>

        <View style={styles.contentContainer}>
            <View style={{marginTop: 25}}>
                <Text style={styles.heading}>Special Instructions</Text>
                <TextInput style={styles.notes}
                onChangeText={(text) => this.setState({notes: text})}
                placeholder = "Please be kind!"
                />
            </View>

            <View style={styles.quantity}>
              <Text style={styles.heading}>Quantity</Text>
              <View style={styles.quantFunc}>
                  <Icon
                  size = {15}
                  raised
                  name='remove'
                  color='#f50'
                  onPress={this.handleRemove} />

                  <TextInput multiline={true} style={styles.textInput}
                  keyboardType='decimal-pad'
                  onChangeText={(text) => this.handleInput(text)}
                  value={(this.state.quantity).toString()}
                  />

                  <Icon
                  size = {15}
                  raised
                  name='add'
                  color='#f50'
                  onPress={this.handleAdd} />
              </View>
            </View>

            <Button
              raised
              icon={{name: 'send'}}
              title='Add to Cart'
              backgroundColor= '#f50'
              containerViewStyle = {styles.submitButton}
              onPress={this.handleSubmit} />

        </View>
        </ScrollView>
      )
      //---------------------------------------------------------------------
    } else{
      //---------------------------------------------------------------------
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )
      //---------------------------------------------------------------------
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer : {
    marginRight: 15,
    marginLeft: 15,
  },
  item_name: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 15
  },
  item_description:{
    color: 'white',
    fontSize: 15,
    marginLeft: 15
  },
  quantFunc : {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  quantity : {
    marginTop: 25,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notes: {
    height: 40,
    flex: 0,
    alignItems: 'stretch',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  heading : {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textInput : {
    height: 40,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1
  },
  submitButton : {
    marginTop: 25
  }
});
