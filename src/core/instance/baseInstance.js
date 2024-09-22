import axios from "axios";

const KAKAO_API_KEY = import.meta.env.REACT_APP_KAKAO_KEY;

export const KAKAO_MAP_API = axios.create({
  baseURL: "https://dapi.kakao.com/v2/maps/", // Kakao Map API의 baseURL 설정
  headers: {
    Authorization: `KakaoAK cf6dffdfd10d314df50c24839218bb60` // Authorization 헤더에 앱 키 추가
  }
});

export const FESTIVAL_API = axios.create({
  baseURL: "http://127.0.0.1:4000/"
});
