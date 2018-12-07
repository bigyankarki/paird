import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Cart',
  };

  render() {
    return (
      <ScrollView>
        <Text>This is a cart.</Text>
      </ScrollView>
    );
  }
}
