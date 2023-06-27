import axios from 'axios';

// const cookies = new Cookies();
// const token = cookies.get('accessToken');
// console.log(token);

// http://192.168.0.110:3334/store/api/v1/banners?storeCode=store_1a2904c1_f0a4_43ed_bdd2_de31ce48f725&size=5&page=0
export default axios.create({
  baseURL: 'https://zefayar.hutechweb.com',
  timeout: 5000,
  withCredentials: false,
  headers: {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1JSUVvd0lCQUFLQ0FRRUFvblVxWnF1UktHREJTakRlTWc5MVhzY0sifQ.eyJlbWFpbCI6ImRlbHppbmFAaHV0ZWNoc29sdXRpb25zLmNvbSIsInBob25lIjoiMSIsImV4cCI6MTY2OTQ2MzU2MywiaWF0IjoxNjY5Mzc3MTYzLCJhdWQiOiJxYSIsImlzcyI6InplZmF5YXIifQ.bliWNIOQn5nz-9rGH6dreiB13iXxaipb1SENIkmIEwefSS8g9mOCAEDjA3xsdi3iwzpueG3sJVbnMyp738eVxeiulaDWoS5r7zFr2pXW9sZtcSCtch8M2SFo0eRfvlcSK4JwtrM1x4ds5yfX3yv7IbyVZF_MF5pdIw5YJxulZ1Q6iExhdFBcfhju40KranJ8fVl8KjlxjEkBoIBtFF-I90wUlbnNCkieYsY2d3C4mfa_r8liSTGwosGcvX0DXs0UDeUvHrW5FhEZgN_1MBU6AzPu-wOe4WQUmjgU6URIskazARcyifUfW2XX4YWiyp98eVa48LPn3-rtXvAzD2fxrw`
  }
});
