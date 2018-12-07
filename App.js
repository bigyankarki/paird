import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, TabBarBottom, createDrawerNavigator } from 'react-navigation';
import { Icon} from 'react-native-elements';
import * as authScreen from './src/screens/authStack/index';
import * as tabScreen from './src/screens/tabStack/index';
import * as drawScreen from './src/screens/drawStack/index';

// Tab Home Stack
const HomeStack = createStackNavigator({
   Nearby: tabScreen.nearby,
   StoreItems: tabScreen.storeItems
 },{
   initialRouteName: 'Nearby',
   defaultNavigationOptions : ({navigation}) => {
     return {
       headerLeft: (<Icon name='menu' color='white' onPress={() => navigation.toggleDrawer()} />),
       headerRight: (<Icon name='add-shopping-cart' color='white' onPress={() => navigation.navigate("Cart")} />),
       headerStyle: {backgroundColor: '#f4511e'},
       headerTintColor: '#fff',
       headerTitleStyle: {fontWeight: 'bold'}
     }
   }
  });

// Tab Order Stack
 const OrderStack = createStackNavigator({
    Order: tabScreen.orders,
    OrderDetails: tabScreen.orderDetails
  },{
    initialRouteName: 'Order',
    defaultNavigationOptions : ({navigation}) => {
      return {
        headerLeft: (<Icon name='menu' color='white' onPress={() => navigation.toggleDrawer()} />),
        headerRight: (<Icon name='add-shopping-cart' color='white' onPress={() => navigation.navigate("Cart")} />),
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'}
      }
    }
  });

// Home Tab stack
const TabStack = createBottomTabNavigator({
  Nearby: HomeStack,
  Orders: OrderStack,
},{defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Nearby') {
        iconName = `near-me`;
      } else if (routeName === 'Orders') {
        iconName = `book`;
      }
      return <Icon name={iconName}  color={tintColor} />;
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

 const CartStack = createStackNavigator({
    Cart: drawScreen.cart
  },{
    initialRouteName: 'Cart',
    defaultNavigationOptions : ({navigation}) => {
      return {
        headerLeft: (<Icon name='menu' color='white' onPress={() => navigation.openDrawer()} />),
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'}
      }
    }
  });

  const SettingsStack = createStackNavigator({
     Settings: drawScreen.settings
   },{
     initialRouteName: 'Settings',
     defaultNavigationOptions : ({navigation}) => {
       return {
         headerLeft: (<Icon name='menu' color='white' onPress={() => navigation.openDrawer()} />),
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
