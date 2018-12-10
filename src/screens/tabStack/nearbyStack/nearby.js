import React from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Text, Button, Image, View, ScrollView, TouchableHighlight } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';

export default class nearby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: {}
    };
  }

  static navigationOptions = {
    title: 'Nearby places',
  };

  componentDidMount = () => {
    let merchs = {}
     const ref = firebase.firestore().collection('merchants');
     ref.get().then(refDoc => {
       refDoc.forEach(doc => {
        merchs[doc['id']] = doc.data();
       })
       this.setState({merchants: merchs})
     }).catch(error => console.log(`error: ${error}`))
  }

  render() {
    let m = this.state.merchants
    const { navigation } = this.props;

    if (!Object.keys(m).length == 0){
      //-------------------------------------
      return (
        <ScrollView>
        <Text style={styles.heading}>Nearby Restaurents</Text>
        <View style={styles.touchable}>
          {Object.keys(m).map((mInfo, i) => (
            <TouchableHighlight key={i} onPress = { () => navigation.navigate('StoreItems', {storeInfo: m[mInfo]}) } >
            <Card image={require('../../../../assets/korean.jpg')} containerStyle={styles.card} imageStyle={{height: 90}}>
              <Text style={styles.text}> {m[mInfo]['business_name']}</Text>
              <Text>30 mins. 4 miles</Text>
            </Card>
            </TouchableHighlight>
          ))}
          </View>
        </ScrollView>
      )
      //-------------------------------------
    } else{
      //-------------------------------------
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      )
      //-------------------------------------
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text : {
    fontSize: 16,
    fontWeight: 'bold'
  },
  heading : {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 15
  },
  card:{
    width:175,
    height:140,
    borderRadius: 10
}
});
