import React from 'react';
import { Button } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import * as authScreen from './src/screens/authStack/index';
import * as appScreen from './src/screens/appStack/index';
import * as tabScreen from './src/screens/tabStack/index';


const HomeStack = createStackNavigator({
   Stores: tabScreen.stores,
   StoreItems: tabScreen.storeItems
 },{ headerMode: 'none' });

 const OrderStack = createStackNavigator({
    Order: tabScreen.orders,
    OrderDetails: tabScreen.orderDetails
  },{ headerMode: 'none' });

const TabStack = createBottomTabNavigator({
  Home: HomeStack,
  Orders: OrderStack,
});

const AppStack = createStackNavigator({
   Homepage: TabStack,
   Cart: appScreen.cart,
   Checkout: appScreen.checkout
 },{
   initialRouteName: 'Homepage',
   defaultNavigationOptions: {
     headerRight: (
      <Button
        onPress={() => alert('This is a checkout button')}
        title="Checkout"
        color="blue"
      />
    ),
    headerTitle: "Paird",
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AuthStack = createStackNavigator({
   Login: authScreen.login
 });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: authScreen.authLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
