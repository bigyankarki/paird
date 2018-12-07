import React from 'react';
import { StyleSheet, AsyncStorage, Button, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class nearby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Nearby places',
  };

  render() {
    return (
      <ScrollView>
        <Text>This is homepage.</Text>
      </ScrollView>
    );
  }
}
