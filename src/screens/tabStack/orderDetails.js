import React from 'react';
import { StyleSheet, AsyncStorage, Button, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class orderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <ScrollView>
        <Text>This is a order page.</Text>
      </ScrollView>
    );
  }
}
