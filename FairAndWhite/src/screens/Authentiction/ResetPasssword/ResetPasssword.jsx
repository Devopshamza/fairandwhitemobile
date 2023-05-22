import React, {useState} from 'react';
import {
  Box,
  Link,
  Pressable,
  useTheme,
  Image,
  ScrollView,
  useToast,
} from 'native-base';
import GradientButton from '../../components/GradientButton';
import BorderGradientBtn from '../../components/BorderGradientBtn';
import FormField from '../../components/FormField';
import HeadingText from '../../components/HeadingText';
import {ImageBackground} from 'react-native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../components/Loading';
import * as Yup from 'yup';
import axios from '../../../apis/axios';
import showToast from '../../components/Toasts';

const ResetPassword = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {colors} = useTheme();
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match',
    ),
  });

  return (
    <Formik
      initialValues={{code: '', password: '', confirmPassword: ''}}
      validationSchema={validationSchema}
      onSubmit={async (values, {setSubmitting}) => {
        setSubmitting(true);
        try {
          const response = await axios.post('auth/login', values);
        } catch (error) {
          showToast(
            toast,
            error?.response?.data?.message ||
              error?.response?.data?.error ||
              error.message,
            'error',
          );
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
          {isSubmitting ? (
            <Loading />
          ) : (
            <Box flex={1}>
              <ImageBackground
                source={require('../../../assets/images/background.png')}
                resizeMode="cover"
                style={{height: '100%'}}>
                <Box flex={1} width="full">
                  <Box padding="5">
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

                    <Box mb="8">
                      <HeadingText heading="Reset Password" text="" />
                    </Box>

                    <Box>
                      <FormField
                        type="text"
                        label="Code"
                        placeholder="Enter Verification Code"
                        color="white"
                        variant="underlined"
                        handleChange={handleChange('code')}
                        handleBlur={handleBlur('code')}
                        key="code"
                        error={errors.code}
                        touched={touched.code}
                      />
                      <FormField
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder="Enter your Password"
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
                              <Icon name="eye-slash" size={25} color="#fff" />
                            ) : (
                              <Icon name="eye" size={25} color="#fff" />
                            )}
                          </Pressable>
                        }
                      />
                      <FormField
                        type={showPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        color="white"
                        variant="underlined"
                        handleChange={handleChange('confirmPassword')}
                        handleBlur={handleBlur('confirmPassword')}
                        key="confirmPassword"
                        error={errors.confirmPassword}
                        touched={touched.confirmPassword}
                      />

                      <Box mb="6" mt="4">
                        <GradientButton
                          onPress={handleSubmit}
                          gradientStart={colors.secondary[300]}
                          gradientEnd={colors.primary[300]}
                          text="Reset"
                          color="black"
                        />
                        <Box marginTop={4}>
                          <BorderGradientBtn
                            onPress={() => navigation.navigate('signup')}
                            gradientStart={colors.secondary[300]}
                            gradientEnd={colors.primary[300]}
                            text="CANCEL"
                            color="white"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </ImageBackground>
            </Box>
          )}
        </>
      )}
    </Formik>
  );
};

export default ResetPassword;
