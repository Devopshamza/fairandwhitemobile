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

const ForgetPassword = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {colors} = useTheme();
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={validationSchema}
      onSubmit={async (values, {setSubmitting}) => {
        setSubmitting(true);
        try {
          const response = await axios.post('auth/login', values);
        } catch (error) {
          showToast(toast, error.message, 'error');
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
            <Box flex={1} width="full">
              <ImageBackground
                source={require('../../../assets/images/background.png')}
                resizeMode="cover"
                style={{height: '100%'}}>
                <ScrollView>
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
                      <HeadingText heading="Forget Password" text=" " />
                    </Box>

                    <Box>
                      <FormField
                        type="email"
                        label="Email"
                        placeholder="Enter Email"
                        color="white"
                        variant="underlined"
                        handleChange={handleChange('email')}
                        handleBlur={handleBlur('email')}
                        key="email"
                        error={errors.email}
                        touched={touched.email}
                      />

                      <Box mb="6" mt="6">
                        <GradientButton
                          onPress={handleSubmit}
                          gradientStart={colors.secondary[300]}
                          gradientEnd={colors.primary[300]}
                          text="Search"
                          color="black"
                        />
                        <Box marginTop={4}>
                          <BorderGradientBtn
                            onPress={() => navigation.goBack()}
                            gradientStart={colors.secondary[300]}
                            gradientEnd={colors.primary[300]}
                            text="CANCEL"
                            color="white"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </ScrollView>
              </ImageBackground>
            </Box>
          )}
        </>
      )}
    </Formik>
  );
};

export default ForgetPassword;
