import React from 'react';
import { StyleSheet, Platform, ActivityIndicator, StatusBar, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item : {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    let item = navigation.getParam('item', 'Item')
    return {
      title: `${item.item_name}`
    };
  };

  componentDidMount = () => {
    let item = this.props.navigation.getParam('item', 'NO-ITEM-DEFAULT')
    console.log(item)
    this.setState({item: item})
  }

  render() {
    const { navigation } = this.props;
    let item = this.state.item

    if (!Object.keys(item).length == 0){
      //---------------------------------------------------------------------
      return (
        <ScrollView>

        <View>
            <Text>{item.item_name}</Text>
            <Text>{item.item_description}</Text>
            <Text>{item.item_price}</Text>
        </View>

        </ScrollView>
      )
      //---------------------------------------------------------------------
    } else{
      //---------------------------------------------------------------------
      return (
        <View style={styles.container}>
          {console.log("before")}
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
  }
});
