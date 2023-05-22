import React, {useContext, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native';
import Loading from './components/Loading';
import AuthStack from './screens/Authentiction/AuthStack';
import DrawerRouter from './routes/Router';
import {useSelector} from 'react-redux';

const App = () => {
  const {authenticated, authenticating} = useSelector(st => st.auth);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (authenticating) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {!authenticated ? <AuthStack /> : <DrawerRouter />}
    </SafeAreaView>
  );
};
export default App;
