import React from 'react';
import { StyleSheet, AsyncStorage, Button, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class stores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: 'Home',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <ScrollView>
        <Text>This is homepage.</Text>
        <Button title="Sign out!" onPress={this._signOutAsync} />
      </ScrollView>
    );
  }
}
