import {
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';

//import Form from 'react-native-form'


import { SignInComponent } from "./modules/auth";
import HomeModule from "./modules/home/Home.module";


const maelstorm = StackNavigator({
  Entry: { screen: SignInComponent },
  Home: { screen : HomeModule }
});

AppRegistry.registerComponent('maelstorm', () => maelstorm);