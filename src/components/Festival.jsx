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
              <h2>{festival.fstvlNm}</h2>
              <li className="festivalDate"><span>일시</span> {festival.fstvlStartDate}</li>
              <li className="festivalLocation"><span>장소</span> {festival.lnmadr}</li>
              <li className="festivalTell"><span>문의</span> {festival.phoneNumber}</li>
              <div className="btnArea">
                <button
                  onClick={() =>
                    handleOpenMapTab(
                      `https://map.kakao.com/link/to/${festival.fstvlNm},${Number(festival.latitude)},${Number(festival.longitude)}`
                    )
                  }
                >
                  길찾기
                </button>
                <button>저장하기</button>
              </div>
            </FestivalItem>
          );
        })}
      </FestivalList>
    </>
  );
}

const FestivalList = styled.div`  
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  height: calc(100vh - 144px);  
  overflow: hidden;
  overflow-y: auto;
  padding: 15px;
`;

const FestivalItem = styled.ul`  
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  list-style: none;
  box-shadow: .5px .5px 10px rgba(0,0,0,.15);
  padding: 15px;
  h2 {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 5px;
    padding: 0 0 5px;
    border-bottom: 1px solid #e5e5e5;
  }
  li {
    position: relative;
    min-height: 18px;
    font-size: 13px;
    padding-left: 40px;
    span {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      font-size: 12px;
      background: #dfdfdf;
      border-radius: 3px;      
    }        
  }
  .btnArea {
    display: flex;
    align-items: center;
    gap: 5px;
    border-top: 1px solid #dfdfdf;
    margin-top: 5px;
    padding-top: 5px;  
    button {
      flex: 1;
    }
  }
`;
