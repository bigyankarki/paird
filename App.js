import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, TabBarBottom, createDrawerNavigator } from 'react-navigation';
import { Icon} from 'react-native-elements';
import * as authScreen from './src/screens/authStack/index';
import * as nearbyScreen from './src/screens/tabStack/nearbyStack/index';
import * as orderScreen from './src/screens/tabStack/orderStack/index';
import * as drawScreen from './src/screens/drawStack/index';

// Tab -> Nearby Stack
const NearbyStack = createStackNavigator({
   Nearby: nearbyScreen.Nearby,
   StoreItems: nearbyScreen.StoreItems,
   ItemDetails: nearbyScreen.ItemDetails
 },{
   initialRouteName: 'Nearby',
   defaultNavigationOptions : ({navigation}) => {
     return {
       headerLeft: (<Icon name='menu' color='white' size={40} onPress={() => navigation.toggleDrawer()} />),
       headerRight: (<Icon name='shopping-cart' size={40} color='white' onPress={() => navigation.navigate("Cart")} />),
       headerStyle: {backgroundColor: '#f4511e'},
       headerTintColor: '#fff',
       headerTitleStyle: {fontWeight: 'bold'}
     }
   }
  });

// Tab -> Order Stack
 const OrderStack = createStackNavigator({
    Order: orderScreen.Orders,
    OrderDetails: orderScreen.OrderDetails
  },{
    initialRouteName: 'Order',
    defaultNavigationOptions : ({navigation}) => {
      return {
        headerLeft: (<Icon name='menu' color='white' size={40} onPress={() => navigation.toggleDrawer()} />),
        headerRight: (<Icon name='shopping-cart' size={40} color='white' onPress={() => navigation.navigate("Cart")} />),
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'}
      }
    }
  });

// Drawer -> Home Stack.
const TabStack = createBottomTabNavigator({
  Nearby: NearbyStack,
  Orders: OrderStack,
},{defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Nearby') {
        iconName = `near-me`;
      } else if (routeName === 'Orders') {
        iconName = `shopping-basket`;
      }
      return <Icon name={iconName} size={35} color={tintColor} />;
    },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: true,
    swipeEnabled: true,
 });

 //Drawer -> Cart Stack.
 const CartStack = createStackNavigator({
    Cart: drawScreen.Cart
  },{
    initialRouteName: 'Cart',
    defaultNavigationOptions : ({navigation}) => {
      return {
        headerLeft: (<Icon name='menu' size={40} color='white' onPress={() => navigation.openDrawer()} />),
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'}
      }
    }
  });

  // Drawer -> Settings Stack.
  const SettingsStack = createStackNavigator({
     Settings: drawScreen.Settings
   },{
     initialRouteName: 'Settings',
     defaultNavigationOptions : ({navigation}) => {
       return {
         headerLeft: (<Icon name='menu'size={40} color='white' onPress={() => navigation.openDrawer()} />),
         headerStyle: {backgroundColor: '#f4511e'},
         headerTintColor: '#fff',
         headerTitleStyle: {fontWeight: 'bold'}
       }
     }
   });

// Drawer stack
const DrawerStack = createDrawerNavigator({
  Home: TabStack,
  Cart: CartStack,
  Settings:  SettingsStack

})

// Authorizataion stack
const AuthStack = createStackNavigator({
   Login: authScreen.login
 });


// Root stack.
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: authScreen.authLoadingScreen,
    App: DrawerStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
