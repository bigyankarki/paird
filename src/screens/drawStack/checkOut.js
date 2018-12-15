import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Checkout',
  };

  render() {
    return (
      <ScrollView>
        <Text>This is a checkout.</Text>
      </ScrollView>
    );
  }
}
