import Axios from "axios";
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL
  } from "../constants/userConstants";


  const signin=(email,password)=>async(dispatch)=>{
      dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password}});
      try{
        let formData = new FormData();
        formData.append('email','scientificfacts226@gmail.com');
        formData.append('password', 'scientific123');
          const {data} = await Axios.post('https://e-prathibha.com/apis/login',formData);
          dispatch({type:USER_SIGNIN_SUCCESS,payload:data.data});
          Cookie.set('userInfo', JSON.stringify(data.data),{ expires: 7 });
      }
      catch(error){
          dispatch({type:USER_SIGNIN_FAIL,payload:error.message});
      }
  }


  export {signin};