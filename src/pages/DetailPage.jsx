import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "EAmfJivTLtIuFxBdgR718mbgrR%2BN3XR4h3PqrUjDyKVBhrj3Y%2FxGRE4vUicjWvf00JOirrM8pE4JZGHVCP33IQ%3D%3D";

const DetailPage = () => {
  const [festivals, setFestivals] = useState([]);
  const [selectedFestival, setSelectedFestival] = useState(null);
  // 축제 데이터 fetch
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
          setFestivals(festivalsArray); // 데이터가 있으면 상태에 저장
        } else {
          console.error("응답에 축제 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("API 호출 에러:", error); // API 호출 오류
      }
    };

    fetchFestivalsData(); // 함수 호출
  }, []);

  // 카카오 지도 및 마커 설정
  useEffect(() => {
    if (!window.kakao) {
      console.error("카카오 지도 API가 로드되지 않았습니다.");
      return;
    }

    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    if (!mapContainer) {
      console.error("지도를 표시할 요소를 찾을 수 없습니다.");
      return;
    }

    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 서울의 기본 중심 좌표
      level: 10 // 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // 마커 이미지
    const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지 크기
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 설정

    // 위도와 경도가 있는 축제만 필터링
    const validFestivals = festivals.filter((festival) => {
      const { latitude, longitude } = festival;
      return latitude && longitude && latitude.trim() !== "" && longitude.trim() !== "";
    });

    // 유효한 축제들에 대해 마커 표시
    validFestivals.forEach((festival) => {
      const { latitude, longitude, fstvlNm } = festival;

      const position = new kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude)); // 축제 좌표 설정

      const marker = new kakao.maps.Marker({
        position, // 마커 위치
        map, // 지도 객체
        title: fstvlNm, // 마커 제목
        image: markerImage // 마커 이미지
      });

      //인포윈도우 생성
      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;z-index:1;">${fstvlNm}</div>`,
        removable: true
      });

      // 마커 클릭 시 축제 이름 알림
      kakao.maps.event.addListener(marker, "click", () => {
        alert(`${fstvlNm} 축제에 오신 것을 환영합니다!`);
        infoWindow.open(map, marker); // 인포윈도우 보여주기
      });

      kakao.maps.event.addListener(marker, "click", () => {
        setSelectedFestival(festival); // 마커 클릭 시 축제 정보 상태 업데이트
      });
    });
  }, [festivals]); // 축제 데이터가 변경될 때마다 지도 업데이트

  return (
    <StDetailPage>
      <MapContainer>
        <h2>축제 지도</h2>
        <div id="map" style={{ width: "100%", height: "800px" }}></div>
      </MapContainer>

      <FestivalInfoContainer>
        <h2>축제 정보</h2>
        {selectedFestival ? (
          <div>
            <p>
              <strong>축제명:</strong> {selectedFestival.fstvlNm}
            </p>
            <p>
              <strong>개최 장소:</strong> {selectedFestival.opar}
            </p>
            <p>
              <strong>축제 시작일:</strong> {selectedFestival.fstvlStartDate}
            </p>
            <p>
              <strong>축제 종료일:</strong> {selectedFestival.fstvlEndDate}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedFestival.phoneNumber}
            </p>
            <p>
              <strong>지번 주소:</strong> {selectedFestival.rdnmadr}
            </p>
            <p>
              <strong>도로명 주소:</strong> {selectedFestival.lnmadr}
            </p>
            <p>
              <strong>축제 내용:</strong> {selectedFestival.fstvlCo}
            </p>
          </div>
        ) : (
          <p>마커를 클릭하여 축제 정보를 확인하세요.</p>
        )}
      </FestivalInfoContainer>
    </StDetailPage>
  );
};

// 스타일 정의
const StDetailPage = styled.div`
  display: flex;
  align-items: flex-start;
`;

const MapContainer = styled.div`
  width: 50%;
`;

const FestivalInfoContainer = styled.div`
  width: 50%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default DetailPage;
