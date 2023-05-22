import serverAxios from './axios';
import deviceAxios from 'axios';

import {authenticateUser, setUser, logoutUser} from '../redux/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import config from '../config/config';
import showToast from '../components/Toasts';

export default class Api {
  constructor() {}

  // Authentication
  async signup(data) {
    return await serverAxios.post('auth/register', data);
  }
  async login(data) {
    return await serverAxios.post('auth/login', data);
  }
  async authenticate(dispatch, online) {
    dispatch(authenticateUser({authenticating: true, authenticated: false}));

    if (!online) {
      const expiry = JSON.parse(await AsyncStorage.getItem('@expiry'));
      if (moment(expiry).isValid()) {
        if (moment(expiry).isAfter(new Date())) {
          dispatch(
            authenticateUser({authenticating: false, authenticated: true}),
          );
        } else {
          dispatch(
            authenticateUser({authenticating: false, authenticated: false}),
          );
        }
      } else {
        dispatch(
          authenticateUser({authenticating: false, authenticated: false}),
        );
      }
    } else {
      try {
        const {data} = await serverAxios.get('auth/verify');
        dispatch(setUser(data.userDetail));

        dispatch(
          authenticateUser({authenticating: false, authenticated: true}),
        );
      } catch (error) {
        dispatch(
          authenticateUser({authenticating: false, authenticated: false}),
        );
      }
    }
  }
  async resetPassword(data) {
    return await serverAxios.put('user/resetpassword', data);
  }
  async getProfileData(userId) {
    return await serverAxios.get(`user/get/${userId}`);
  }
  async editUserData(userId, payload) {
    return await serverAxios.put(`user/edit/${userId}`, payload);
  }

  errorResponse(error) {
    if (error.response?.data) {
      return {success: false, message: error.response.data};
    } else {
      return {success: false, message: error.message};
    }
  }
  async getStrains() {
    try {
      const {data} = await serverAxios.get('strain/getname');
      const temp = data.data.map(item => ({
        label: item.name,
        value: item._id,
        soils: item.soil.map(item2 => ({label: item2.name, value: item2._id})),
        stages: item.stage,
      }));
      let a = {};
      temp.forEach(item => {
        a[item.value] = item.soils;
      });
      await AsyncStorage.setItem(
        '@strains',
        JSON.stringify({strains: temp, soils: a}),
      );
    } catch (error) {}
  }
  async getStrain() {
    try {
      const {data} = await serverAxios.get('strain/getname');
      const temp = data.data.map(item => ({
        label: item.name,
        value: item._id,
        soils: item.soil.map(item2 => ({label: item2.name, value: item2._id})),
      }));
      let a = {};
      temp.forEach(item => {
        a[item.value] = item.soils;
      });
      return {success: true, strains: temp, soils: a};
    } catch (error) {
      return this.errorResponse(error);
    }
  }
  async addPlant(payload, url, mac, strains, soils, dispatch) {
    try {
      const timezone = this.timezoneOffset();
      const grow = {
        age: payload.age,
        duration: payload.duration,
        name: payload.name,
        strain: strains.find(item => item.value === payload.strain).label,
        floweringType:
          payload.floweringStatus === 'regular' ? 'Regular' : 'Auto-Flower',
        soil: soils[payload.strain].find(item => item.value === payload.soil)
          .label,
        timezone: timezone,
        seedType: payload.plantingStatus === 'seed' ? 'Seed' : 'Clone',
      };
      await deviceAxios.post(`http://${url}/set_grow`, grow);

      const temp = await AsyncStorage.getItem('@addDevice');
      if (!temp) {
        let tempJson = {
          [mac]: {
            name: mac,
            additionalInfo: {
              macAddress: mac,
            },
            plantDetail: payload,
          },
        };
        await AsyncStorage.setItem('@addDevice', JSON.stringify(tempJson));
      } else {
        const tempJson = JSON.parse(temp);
        if (tempJson[mac]) {
          tempJson[mac] = {
            ...tempJson[mac],
            plantDetail: payload,
          };
        } else {
          tempJson[mac] = {
            name: mac,
            additionalInfo: {
              macAddress: mac,
            },
            plantDetail: payload,
          };
        }
        await AsyncStorage.setItem('@addDevice', JSON.stringify(tempJson));
      }
      await this.getStatus(url, dispatch);
      return {success: true};
    } catch (error) {
      return this.errorResponse(error);
    }
  }
  async setWifi(ssid, password, url) {
    try {
      const payload = {
        ssid,
        password,
      };

      const response = await deviceAxios.post(`http://${url}/connect`, payload);

      return {success: true, data: response.data};
    } catch (error) {
      return this.errorResponse(error);
    } finally {
    }
  }
  // Set light on or off
  async toggleLight({power, url, dispatch}) {
    try {
      await deviceAxios.post(`http://${url}/manual_lights`, {power});

      await this.getStatus(url, dispatch);
    } catch (error) {}
  }

  async setStage(payload, url, dispatch) {
    try {
      await deviceAxios.post(`http://${url}/set_stage`, payload);
      await this.getStatus(url, dispatch);
      const temp = {
        macAddress: payload.mac,
        stage: {
          order: payload.stage_number,
          duration: config.DEFAULT_STAGE_DURATION,
          lightSchedule: {
            startTime: `${payload.stage_data.lighting_schedule.on_hour}:${payload.stage_data.lighting_schedule.on_minute}`,
            endTime: `${payload.stage_data.lighting_schedule.off_hour}:${payload.stage_data.lighting_schedule.off_minute}`,
          },
          soilMoisture: {
            min: payload.stage_data.soil_moisture[0],
            max: payload.stage_data.soil_moisture[1],
          },
          waterLevel: {
            min: 30,
            max: 40,
          },
          temperature: payload.stage_data.temperature[0],
          humidity: payload.stage_data.humidity[0],
        },
      };
      await AsyncStorage.setItem('@setStage', JSON.stringify(temp));
      return {success: true};
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async syncAddPlant() {
    const temp = await AsyncStorage.getItem('@addDevice');
    if (temp && temp !== '{}') {
      const tempJson = JSON.parse(temp);
      const tempResponse = {};
      // for (const [key, value] of Object.entries(tempJson)) {
      //   try {
      //     await serverAxios.post('device/create', value);
      //   } catch (error) {
      //     tempResponse[key] = value;
      //   }
      // }
      // await AsyncStorage.setItem('@addDevice', JSON.stringify(tempResponse));
    }
  }
  // Grow University
  async getVideoCategories() {
    return await serverAxios('category/getall?type=post');
  }
  async getFeaturePosts() {
    return await serverAxios('post/getfeatured');
  }
  async getVideoList(id, page = 1) {
    return await serverAxios(
      `post/getall?categoryId=${id}&page=${page}&limit=5`,
    );
  }

  // Shop
  async getProducts(page, limit) {
    return await serverAxios.get(`product/getall?page=${page}&limit=${limit}`);
  }

  async logout(dispatch) {
    try {
      await AsyncStorage.removeItem('@token');
      await dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
  }

  async getDetail() {
    return await serverAxios.get('content/getall');
  }

  async addToCart(payload) {
    return await serverAxios.post('cart', payload);
  }

  async getCart() {
    return await serverAxios.get('cart');
  }

  async editCart(payload) {
    return await serverAxios.put('cart', payload);
  }
  async removeProduct(productId) {
    return await serverAxios.delete(`cart/${productId}`);
  }
  async getGraphRange(payload) {
    const date = moment(new Date()).format('MM-DD-YYYY');

    const {data} = await serverAxios.get(
      `device/${
        payload.range === 'daily' ? 'getdailygraph' : 'getrangegraph'
      }/${payload.mac}/${payload.range === 'daily' ? date : payload.range}`,
    );

    const temp = data.data.map(item => ({
      day:
        payload.range === 'daily'
          ? moment(item._id, ['HH']).format('hh A')
          : payload.range === 'monthly'
          ? moment(item._id.month, 'M').format('MMM')
          : moment(item._id).format('ddd'),
      temperature: item.avg_temperature,
      humidity: item.avg_humidity,
      lightIntensity: item.avg_lightIntensity,
      soilMoisture: item.avg_soilMoisture,
      waterLevel: item.avg_waterLevel,
    }));

    const legends = temp.map(item => item.day);
    const temperature = temp.map(item => item.temperature);
    const humidity = temp.map(item => item.humidity);
    const lightIntensity = temp.map(item => item.lightIntensity);
    const waterLevel = temp.map(item => item.waterLevel);
    return {legends, temperature, humidity, lightIntensity, waterLevel};
  }

  async getEvents(mac) {
    let result = {};
    const {data} = await serverAxios.get(`event/getall/${mac}`);

    for (let i of data.data[0].result) {
      const date = moment(i.date).format('YYYY-MM-DD');

      result[date] = [...(result[date] || []), i];
      // result[i.date] = [...result[moment(i.data).format('YYYY-MM-DD')], i];
    }

    return result;
  }
}
