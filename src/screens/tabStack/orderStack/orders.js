import React from 'react';
import { StyleSheet, AsyncStorage, Button, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Active Orders',
  };

  render() {
    return (
      <ScrollView>
        <Text>This is a order page.</Text>
      </ScrollView>
    );
  }
}
