import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://burger-b5885.firebaseio.com/'

});

export default instance;