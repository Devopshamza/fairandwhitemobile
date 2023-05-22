import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/config';

const instance = axios.create({
  baseURL: config.getServerUrl(),
});

async function getToken() {
  const token = await AsyncStorage.getItem('@token');
  return token;
}

instance.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
