import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './src/Login';
import Logged from './src/Logged';

const AppNavigator = createStackNavigator({
  Login:{
		screen:Login,
		navigationOptions: {
		  title: "Entrar"
		}
	},Logged: {
		screen: Logged,
		navigationOptions: {
		  title: "Meu perfil"
		}
	  }
});



export default createAppContainer(AppNavigator);
