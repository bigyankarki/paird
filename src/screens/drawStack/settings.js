import React from 'react';
import { AsyncStorage, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Settings',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <ScrollView>
        <Text>This is a settings.</Text>
        <Button title="Sign out!" onPress={this._signOutAsync} />
      </ScrollView>
    );
  }
}
