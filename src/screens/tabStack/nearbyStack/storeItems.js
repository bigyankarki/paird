import React from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Platform, Image, Text, View, ScrollView, TouchableHighlight, ImageBackground } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class StoreItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    let info = navigation.getParam('storeInfo', 'Store')
    return {
      title: `${info.business_name}`
    };
  };

  componentDidMount = () => {
    let info = this.props.navigation.getParam('storeInfo', 'Store')
    this.setState({info: info})
  }

  render() {
    const { navigation } = this.props;
    let info = this.state.info;
    console.log(info);
    if(!Object.keys(info).length == 0){
      //-----------------------------------------------------------------------------------
      return (
        <ScrollView>

        <ImageBackground source={require('../../../../assets/korean.jpg')} style={{flex:0, justifyContent: 'center', alignItems:'stretch', height: 150}}>
            <Text style={styles.business_name}>{info.business_name}</Text>
            <Text style={styles.business_description}>{info.business_address}</Text>
            <Text style={styles.business_description}>{info.business_phone}</Text>
        </ImageBackground>

        <View style={styles.touchable}>
        {info['menu'].map((item,i) => (
          <TouchableHighlight key={i} onPress = { () => navigation.navigate('ItemDetails', {item : item, storeInfo: info}) } >
            <Card image={{uri: item['image_url']}} containerStyle={styles.card} imageStyle={{height: 90}}>
              <View style={styles.cardFooter}>
              <Text style={styles.text}>{item.item_name}</Text>
              <Text>${item.item_price}</Text>
              </View>
            </Card>
          </TouchableHighlight>
        ))}
        </View>

        </ScrollView>
      );
      //-----------------------------------------------------------------------------------
    } else{
      //-----------------------------------------------------------------------------------
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
      //-----------------------------------------------------------------------------------
    }

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width:155,
    height:140,
    borderRadius: 10
  },
  touchable: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }, cardFooter :{
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text : {
    fontSize: 15,
    fontWeight: 'bold'
  },
  business_name: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 15
  },
  business_description:{
    color: 'white',
    fontSize: 15,
    marginLeft: 15
  }
});
