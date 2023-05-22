import {StyleSheet, ImageBackground, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  Box,
  Link,
  Text,
  useTheme,
  Image,
  Pressable,
  useToast,
  ScrollView,
  HStack,
} from 'native-base';
import GradientButton from '../../../components/GradientButton';
import BorderGradientBtn from '../../../components/BorderGradientBtn';
import FormField from '../../../components/FormField';
import HeadingText from '../../../components/HeadingText';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/Feather';
import Loading from '../../../components/Loading';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/auth';
import {ApiContext} from '../../../../index';
import showToast from '../../../components/Toasts';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {colors} = useTheme();
  const toast = useToast();
  const dispatch = useDispatch();
  const api = useContext(ApiContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={async (values, {setSubmitting}) => {
        setSubmitting(true);
        try {
          const response = await api.login(values);
          if (response.data?.token) {
            await AsyncStorage.removeItem('@token');
            await AsyncStorage.setItem('@token', response.data.token);
            const tokenExpiry = jwt_decode(response.data.token).exp * 1000;
            await AsyncStorage.setItem('@expiry', JSON.stringify(tokenExpiry));

            dispatch(setUser(response.data.user));
          }
        } catch (error) {
          if (
            error.response?.data?.message?.includes('E-mail is not verified')
          ) {
            showToast(toast, error.response.data.message, 'error');
            navigation.navigate('emailVerification');
          } else {
            showToast(
              toast,
              error?.response?.data?.message ||
                error?.response?.data?.error ||
                error.message,
              'error',
            );
          }
        } finally {
          setSubmitting(false);
        }
      }}>
      {({
        handleChange,
        handleBlur,
        touched,
        errors,
        handleSubmit,
        isSubmitting,
      }) => (
        <>
          {isSubmitting && (
            <Box
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
              }}>
              <Loading />
            </Box>
          )}
          <Box flex={1} width="full" style={{zIndex: 1}}>
            <ImageBackground
              source={require('../../../assets/images/background.png')}
              resizeMode="cover"
              style={{flex: 1}}>
              <ScrollView>
                <Box p="5">
                  <Box
                    height="100"
                    alignItems="center"
                    justifyContent="center"
                    mt="20"
                    mb="14">
                    <Image
                      alt="logo"
                      source={require('../../../assets/images/logo.png')}
                      resizeMode="contain"
                      maxHeight="100"
                      maxWidth="1/2"
                    />
                  </Box>

                  <Box mb="7">
                    <HeadingText heading="Sign In" text="" />
                  </Box>

                  <Box>
                    <FormField
                      type="text"
                      label="Email"
                      // placeholder="Enter your email"
                      color="white"
                      variant="underlined"
                      handleChange={handleChange('email')}
                      handleBlur={handleBlur('email')}
                      key="email"
                      error={errors.email}
                      touched={touched.email}
                    />
                    <FormField
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      // placeholder="Enter your password"
                      color="white"
                      variant="underlined"
                      handleChange={handleChange('password')}
                      handleBlur={handleBlur('password')}
                      key="password"
                      error={errors.password}
                      touched={touched.password}
                      InputRightElement={
                        <Pressable onPress={() => setShowPassword(st => !st)}>
                          {showPassword ? (
                            <Icon name="eye-off" size={20} color="#fff" />
                          ) : (
                            <Icon name="eye" size={20} color="#fff" />
                          )}
                        </Pressable>
                      }
                    />
                    <HStack justifyContent="flex-end">
                      <Link
                        onPress={() => navigation.navigate('forgetPassword')}>
                        <Text
                          mb="8"
                          fontWeight="semibold"
                          // fontSize="sm"
                          style={{textAlign: 'right'}}
                          color={colors.textGray[400]}>
                          Forgot your Password?
                        </Text>
                      </Link>
                    </HStack>

                    <Box mb="1">
                      <GradientButton
                        onPress={handleSubmit}
                        gradientStart={colors.secondary[300]}
                        gradientEnd={colors.primary[300]}
                        text="SIGN IN"
                        color="black"
                      />
                      <Box marginTop={4}>
                        <BorderGradientBtn
                          onPress={() => navigation.navigate('signup')}
                          gradientStart={colors.secondary[300]}
                          gradientEnd={colors.primary[300]}
                          text="CREATE AN ACCOUNT"
                          color="white"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </ScrollView>
            </ImageBackground>
          </Box>
        </>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
