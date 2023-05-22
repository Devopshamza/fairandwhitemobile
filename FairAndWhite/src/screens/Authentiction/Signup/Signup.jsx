import React, {useContext, useState} from 'react';
import {
  Box,
  Text,
  useTheme,
  Image,
  FormControl,
  ScrollView,
  Input,
  Pressable,
  useToast,
  Modal,
  Button,
} from 'native-base';
import GradientButton from '../../components/GradientButton';
import BorderGradientBtn from '../../components/BorderGradientBtn';
import FormField from '../../components/FormField';
import HeadingText from '../../components/HeadingText';
import {ImageBackground} from 'react-native';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Loading from '../../components/Loading';
import {ApiContext} from '../../..';
import showToast from '../../components/Toasts';

const Signup = ({navigation}) => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const {colors} = useTheme();
  const api = useContext(ApiContext);
  const initialRef = React.useRef(null);

  // State
  const [showCalender, setShowCalender] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters required')
      .required('Required'),
    dob: Yup.string().required('Required'),
  });

  return (
    <Box flex="1">
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <Formik
          initialValues={{email: '', password: '', username: '', dob: ''}}
          validationSchema={validationSchema}
          onSubmit={async (values, {setSubmitting}) => {
            setSubmitting(true);
            try {
              const response = await api.signup(values);
              showToast(toast, response.data.message, 'success');
              navigation.navigate('emailVerification');
            } catch (error) {
              showToast(
                toast,
                error?.response?.data?.error || error.message,
                'error',
              );
            } finally {
              setSubmitting(false);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            touched,
            values,
            errors,
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
              <Box py="5" px="6">
                {/* <BackButton navigation={navigation} route={'afd'} /> */}

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

                <Box mb="5">
                  <HeadingText heading="Create an Account" text="" />
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
                    error={errors.email}
                    touched={touched.email}
                  />

                  <FormField
                    type="text"
                    label="Username"
                    // placeholder="Enter your username"
                    color="white"
                    variant="underlined"
                    handleChange={handleChange('username')}
                    handleBlur={handleBlur('username')}
                    key="username"
                    error={errors.username}
                    touched={touched.username}
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
                  <Modal
                    isOpen={showCalender}
                    onClose={() => setShowCalender(false)}
                    initialFocusRef={initialRef}>
                    <Modal.Content>
                      <Modal.CloseButton />

                      <Modal.Body bg={colors.primary[900]} style={{width: 350}}>
                        <DatePicker
                          mode="calendar"
                          maximumDate={getFormatedDate(
                            new Date(),
                            'YYYY-MM-DD',
                          )}
                          onSelectedChange={date => {
                            setFieldValue('dob', date);
                            setShowCalender(false);
                          }}
                          options={{
                            backgroundColor: colors.primary[900],
                            textHeaderColor: colors.primary[400],
                            textDefaultColor: colors.customDark[200],
                            selectedTextColor: colors.primary[900],
                            mainColor: colors.primary[400],
                            textSecondaryColor: colors.customDark[100],
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                          }}
                          style={{width: 300}}
                        />
                      </Modal.Body>
                    </Modal.Content>
                  </Modal>

                  <FormControl.Label
                    fontSize="xs"
                    color={colors.textGray[400]}
                    m="0"
                    p="0">
                    Date of Birth
                  </FormControl.Label>
                  <Pressable onPress={() => setShowCalender(true)}>
                    <Input
                      value={values.dob === '' ? '' : values.dob}
                      p="1"
                      fontSize="sm"
                      fontWeight="500"
                      isInvalid={errors.dob && touched.dob ? true : false}
                      variant="underlined"
                      // placeholder="Select Date"
                      placeholderTextColor={colors.textGray[400]}
                      borderColor={colors.textGray[400]}
                      InputRightElement={
                        <Pressable onPress={() => setShowCalender(st => !st)}>
                          <Icon name="calendar" size={25} color="#fff" />
                        </Pressable>
                      }
                      showSoftInputOnFocus
                    />
                    <Box
                      zIndex={2}
                      w="full"
                      h="full"
                      p="4"
                      position="absolute"
                      bg="red"></Box>
                  </Pressable>
                  <Text fontSize="sm" color="danger.700">
                    {errors.dob && touched.dob && errors.dob}
                  </Text>

                  <Box mb="1">
                    <GradientButton
                      onPress={handleSubmit}
                      gradientStart={colors.secondary[300]}
                      gradientEnd={colors.primary[600]}
                      text="SIGN UP"
                      color="black"
                    />
                    <Box marginTop={4}>
                      <BorderGradientBtn
                        onPress={() => navigation.navigate('login')}
                        gradientStart={colors.secondary[300]}
                        gradientEnd={colors.primary[300]}
                        text="HAVE AN ACCOUNT? SIGN IN"
                        color="white"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Formik>
      </ImageBackground>
    </Box>
  );
};

export default Signup;
