import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

const API_KEY = "EAmfJivTLtIuFxBdgR718mbgrR%2BN3XR4h3PqrUjDyKVBhrj3Y%2FxGRE4vUicjWvf00JOirrM8pE4JZGHVCP33IQ%3D%3D";

export function Festival() {
  const [festivalList, setFestivalList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFestivalsData = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&type=JSON`
        );
        console.log("API Response:", response.data); // API 응답 구조 확인

        // 응답 데이터가 있는지 확인
        const festivalsArray = response.data.response.body.items;
        if (festivalsArray && Array.isArray(festivalsArray)) {
          setFestivalList(festivalsArray); // 데이터가 있으면 상태에 저장
        } else {
          console.error("응답에 축제 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("API 호출 에러:", error); // API 호출 오류
      }
    };
    fetchFestivalsData();
  }, []);

  console.log(festivalList);

  const handleOpenMapTab = (url) => {
    console.log(url);
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <>
      <FestivalList>
        {festivalList.map((festival) => {
          return (
            <FestivalItem key={uuid()}>
              <li>
                <h2>{festival.fstvlNm}</h2>
              </li>
              <li>일시 : {festival.fstvlStartDate}</li>
              <li>장소 : {festival.lnmadr}</li>
              <li>문의 : {festival.phoneNumber}</li>
              <button
                onClick={() =>
                  handleOpenMapTab(
                    `https://map.kakao.com/link/map/${Number(festival.latitude)},${Number(festival.longitude)}`
                  )
                }
              >
                길찾기
              </button>
            </FestivalItem>
          );
        })}
      </FestivalList>
    </>
  );
}

const FestivalList = styled.div`
  width: 400px;
  height: 850px;
  padding: 15px;
  overflow: scroll;
`;

const FestivalItem = styled.div`
  width: 100%;
  height: 15vh;
  list-style: none;
  border: 1px solid black;
  margin: 7px;
`;
