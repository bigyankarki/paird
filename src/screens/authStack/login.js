import React from 'react';
import { StyleSheet, AsyncStorage, Image, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class Splash extends React.Component {

  static navigationOptions = {
    title: 'Welcome to Paird',
  };

  constructor(props) {
    super(props);
      this.state = {
        info : {}
      }
  }

  isNewUser = async (id) => {
    const ref = await firebase.firestore().collection('user').doc(id);
    let isNew = await ref.get().then(doc => {
    if (doc.exists) {
        console.log("User exists :", doc.data());
        return false;
    } else {
        // doc.data() will be undefined in this case
        console.log("New User!");
        return true;
    }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return isNew;
}

  saveToDB = async(u) => {
    const ref = await firebase.firestore().collection('user').doc(u.uid);
    if(!ref.exists){
      ref.set({
          userInfo: u
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
  }

  //Google signIN
  handleLogin = async () => {
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
      // login with credential
      const currentUser = await firebase.auth().signInWithCredential(credential);

      // check if the user is New.
      let user = currentUser.user._user
      let isNew = await this.isNewUser(user.uid)
      if(isNew){
        this.saveToDB(user) //save userInformation to database.
      }

      await AsyncStorage.setItem('userToken', user.uid); // set the async storage
      this.props.navigation.navigate('App', {userInfo : user}); // navigate to app stack.

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
};

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.heading}> Paird. </Text>
      <GoogleSigninButton
        style={{ width: 312, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.handleLogin}
        disabled={this.state.isSigninInProgress} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
  },
  heading : {
    height: 200,
    fontWeight: 'bold',
    fontSize: 80,
}
});
