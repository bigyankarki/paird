import React from 'react';
import { Button } from 'react-native';

const tabStyle = {
  headerRight: (
   <Button
     onPress={() => alert('This is a checkout button')}
     title="Checkout"
     color="blue"
   />
 ),
   headerStyle: {
     backgroundColor: '#f4511e',
   },
   headerTintColor: '#fff',
   headerTitleStyle: {
     fontWeight: 'bold',
   },
 }

 const settingsStyle = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

export {tabStyle, settingsStyle}
