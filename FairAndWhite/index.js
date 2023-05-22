/**
 * @format
 */
// React Navigation Container
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
// Importing Theme
import theme from './src/theme/theme';
import App from './src/App';
import {name as appName} from './app.json';
import store from './src/redux/store';
import React from 'react';
import Api from './src/apis/api';
export const ApiContext = React.createContext(null);
function AppWrapper() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <ApiContext.Provider value={new Api()}>
            <App />
          </ApiContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => AppWrapper);
