import axios from "axios";

const USER_API = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr"
})

USER_API.interceptors.request.use(
  function(config){
    console.log("JWT 인증서버 잘 받아와짐");
    return config;
  },
  function(error){
    console.log("JWT 인증서버 잘 안받와짐");
    return Promise.reject(error)
  }
)

USER_API.interceptors.response.use(
  function(response){
    return response;
  },
  function(error){
    if(error.response){
      // 에러 처리 - 401(보편적임)

    }else{
      console.log("JWT 서버 응답 없음.")
    }
    return Promise.reject(error);
  }
)

export default USER_API;