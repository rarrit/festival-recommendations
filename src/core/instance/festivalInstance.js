import axios from "axios";
const API_KEY = "EAmfJivTLtIuFxBdgR718mbgrR%2BN3XR4h3PqrUjDyKVBhrj3Y%2FxGRE4vUicjWvf00JOirrM8pE4JZGHVCP33IQ%3D%3D";

// const festivalIns = axios.post({
//   baseURL: "http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api",
//   params: {
//     serviceKey: encodedURL,
//     type: "json",
//     numOfRows: 100,
//     pageNo: 1,
//     fstvlNm: "fstvlNm",
//     latitude: "latitude",
//     longitude: "longitude",
//     opar: "opar",
//     fstvlStartDate: "fstvlStartDate",
//     fstvlEndDate: "fstvlEndDate",
//     fstvlCo: "fstvlCo",
//     phoneNumber: "phoneNumber"
//   }
// });
// let queryParams = {
//   serviceKey: fJPmhSiX%2BRtunMRUHM4tM1AxcWeLurUucYNm8rLKygykn1bn2USk8stDmvS7WbVu%2B7fNxx3mA50FnL64kweMJw%3D%3D,
//   pageNo: "1",
//   numOfRows: "100",
//   type: "JSON"
// };

console.log(
  `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&type=JSON`
);
const festivalIns = axios.get(
  `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=EAmfJivTLtIuFxBdgR718mbgrR%2BN3XR4h3PqrUjDyKVBhrj3Y%2FxGRE4vUicjWvf00JOirrM8pE4JZGHVCP33IQ%3D%3D&pageNo=1&numOfRows=100&type=JSON`,
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

// import axios from "axios";

// const API_KEY = "EAmfJivTLtIuFxBdgR718mbgrR%2BN3XR4h3PqrUjDyKVBhrj3Y%2FxGRE4vUicjWvf00JOirrM8pE4JZGHVCP33IQ%3D%3D";
// const BASE_URL = "http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api";

// const festivalApi = axios.create({
//   baseURL: BASE_URL,
//   params: {
//     serviceKey: API_KEY,
//     type: "json",
//     numOfRows: 100,
//     pageNo: 1
//   }
// });

// const fetchFestivals = async (festivalName = "", lat = "", lng = "") => {
//   try {
//     const response = await festivalApi.get("", {
//       params: {
//         fstvlNm: festivalName,
//         latitude: lat,
//         longitude: lng
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("API 호출 에러:", error);
//     throw error;
//   }
// };

// export { fetchFestivals };
