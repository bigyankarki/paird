import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <Text>This is a checkout.</Text>
      </ScrollView>
    );
  }
}
