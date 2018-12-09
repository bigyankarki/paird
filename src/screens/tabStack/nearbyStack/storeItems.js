import React from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Platform, Image, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class storeItems extends React.Component {
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
    let info = this.state.info
    if(!Object.keys(info).length == 0){
      //-----------------------------------------------------------------------------------
      return (
        <ScrollView>
        
        <View>
            <Text>{info.business_name}</Text>
            <Text>{info.business_address}</Text>
            <Text>{info.business_phone}</Text>
        </View>

        <View style={styles.touchable}>
        {info['menu'].map((item,i) => (
          <TouchableHighlight key={i} onPress = { () => navigation.navigate('ItemDetails', {item : item}) } >
            <Card image={{uri: item['image_url']}} containerStyle={styles.card}>
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
    width:175,
    height:200,
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
    fontSize: 16,
    fontWeight: 'bold'
  }
});