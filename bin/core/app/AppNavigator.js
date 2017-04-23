import { StackNavigator  } from 'react-navigation';

import { SignInComponent } from "../../modules/auth/index";
import HomeModule from "../../modules/home/Home.module";

export default StackNavigator({
  Entry: { screen: SignInComponent },
  Home: { screen : HomeModule }
});