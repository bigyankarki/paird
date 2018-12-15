import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info : {}
    };
  }

  static navigationOptions = {
    title: 'Cart',
  };

  componentDidMount = () => {
    let info = this.props.navigation.getParam('orderInfo', 'NO-ITEM-DEFAULT')
    this.setState({info: info})
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <Text>This is a cart.</Text>
      </ScrollView>
    );
  }
}
