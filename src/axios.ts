import axios from 'axios';
import { baseURL } from './url';
import EncryptedStorage from 'react-native-encrypted-storage';

// const cookies = new Cookies();
// const token = cookies.get('accessToken');
// console.log(token);

// http://192.168.0.110:3334/store/api/v1/banners?storeCode=store_1a2904c1_f0a4_43ed_bdd2_de31ce48f725&size=5&page=0
const getToken = async () => {
  return await EncryptedStorage.getItem('_token').then((response: any) => {
    const tokenData = JSON.parse(response || 'null');
    return tokenData.token||null
  });
};
export default axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: false,
 
});
