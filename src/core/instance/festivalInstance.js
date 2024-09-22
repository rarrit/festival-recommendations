import axios from "axios";

console.log(
  `https://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${import.meta.env.VITE_KAKAO_MAP_KEY}&pageNo=1&numOfRows=100&type=JSON`
);
const festivalIns = axios.get(
  `https://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=EAmfJivTLtIuFxBdgR718mbgrR%2BN3XR4h3PqrUjDyKVBhrj3Y%2FxGRE4vUicjWvf00JOirrM8pE4JZGHVCP33IQ%3D%3D&pageNo=1&numOfRows=100&type=JSON`,
  {}
);
console.log("api=>", API_KEY);
const fetchFestivals = async (festivalName, lat, lng) => {
  try {
    const response = await festivalIns.get("", {
      params: {
        fstvlNm: festivalName || "",
        latitude: lat || "",
        longitude: lng || ""
      }
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

export { festivalIns, fetchFestivals };
