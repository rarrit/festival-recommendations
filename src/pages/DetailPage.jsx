import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import GetYoutube from "@/components/GetYoutube";
import { useLocation, useParams } from "react-router-dom";
import { mediaQuery } from "@/core/utils/\bresponsive";

const DetailPage = () => {
  const [festivals, setFestivals] = useState([]);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const { fstvlCo } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");

  // 축제 데이터 fetch
  useEffect(() => {
    const fetchFestivalsData = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${import.meta.env.VITE_FESTIVAL_KEY}&pageNo=1&numOfRows=100&type=JSON`
        );
        console.log("API Response:", response.data); // API 응답 구조 확인

        // 응답 데이터가 있는지 확인
        const festivalsArray = response.data.response.body.items;
        const festivalData = festivalsArray.find((festival) => festival.fstvlCo === fstvlCo);
        if (festivalData) {
          setFestivals(festivalsArray);
          setSelectedFestival(festivalData); // 데이터가 있으면 상태에 저장
        } else {
          console.error("응답에 축제 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("detail API 호출 에러:", error); // API 호출 오류
      }
    };

    fetchFestivalsData(); // 함수 호출
  }, [fstvlCo]);

  // 카카오 지도 및 마커 설정
  useEffect(() => {
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

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
      center: new kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude)), // 전달받은 위도와 경도 사용
      level: 3 // 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

    // 해당 축제의 마커 생성
    const position = new kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
    const marker = new kakao.maps.Marker({
      position, // 마커 위치
      map, // 지도 객체
      image: markerImage
    });

    // 해당 축제 마커에 윈도우 인포 자동 표시
    const infoWindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:10px; max-width:200px; max-height:100px; white-space:normal; word-wrap:break-word; overflow:auto; font-size:13px">
           ${selectedFestival ? selectedFestival.fstvlNm : "축제 위치"}
        </div>`,
      removable: true
    });

    // 페이지 로드 시 자동으로 해당 축제의 마커에 윈도우 인포 띄우기
    infoWindow.open(map, marker);

    kakao.maps.event.addListener(marker, "click", () => {
      infoWindow.open(map, marker);
    });

    // 다른 마커 설정 (선택 사항: 다른 마커에는 기본적인 윈도우 인포 적용 가능)
    festivals.forEach((festival) => {
      if (festival.latitude !== latitude && festival.longitude !== longitude) {
        const otherPosition = new kakao.maps.LatLng(parseFloat(festival.latitude), parseFloat(festival.longitude));
        const otherMarker = new kakao.maps.Marker({
          position: otherPosition,
          map,
          image: markerImage
        });

        const otherInfoWindow = new kakao.maps.InfoWindow({
          content: `
          <div style="padding:5px; max-width:2000px; max-height:100px; white-space:normal; word-wrap:break-word; overflow:auto; font-size:13px">
            ${festival.fstvlNm}
          </div>`,
          removable: true
        });

        kakao.maps.event.addListener(otherMarker, "click", () => {
          otherInfoWindow.open(map, otherMarker);
        });
      }
    });
  }, [festivals, latitude, longitude, selectedFestival]); // 축제 데이터와 좌표가 변경될 때마다 지도 업데이트

  return (
    <StDetailPage>
      <StMapContainer>        
        <StMap id="map" style={{ width: "100%", height: "calc(100vh - 135px)" }}></StMap>
      </StMapContainer>

      <StFestivalInfoContainer>
        <StVideoArea>
          <h2 className="titleMovie">관련 영상<em> (YOUTUBE 상위 영상입니다.)</em></h2>
          {selectedFestival ? <GetYoutube keyword={selectedFestival && selectedFestival.fstvlNm} /> : null}
        </StVideoArea>
        <h2>{selectedFestival && selectedFestival.fstvlNm}</h2>
        {selectedFestival ? (
          <div className="info">
            <p>
              <strong>개최 장소</strong> {selectedFestival.opar}
            </p>
            <p>
              <strong>축제 시작일</strong> {selectedFestival.fstvlStartDate}
            </p>
            <p>
              <strong>축제 종료일</strong> {selectedFestival.fstvlEndDate}
            </p>
            <p>
              <strong>전화번호</strong> {selectedFestival.phoneNumber}
            </p>
            <p>
              <strong>지번 주소</strong> {selectedFestival.rdnmadr}
            </p>
            <p>
              <strong>도로명 주소</strong> {selectedFestival.lnmadr}
            </p>
            <p>
              <strong>축제 내용</strong> {selectedFestival.fstvlCo}
            </p>
          </div>
        ) : (
          <p>마커를 클릭하여 축제 정보를 확인하세요.</p>
        )}
      </StFestivalInfoContainer>
    </StDetailPage>
  );
};

// 스타일 정의
const StDetailPage = styled.div`
  display: flex;
  align-items: flex-start;
  height: calc(100% - 35px);
  ${
    mediaQuery.mobile`
      flex-direction: column;
      width: 100%;
      height: auto;    
    `
  }  
`;
const StMapContainer = styled.div`
  width: 50%;
  ${
    mediaQuery.mobile`
      width: 100%;
      height: 250px;
    `
  }  
`;
const StMap = styled.div`
  ${
    mediaQuery.mobile`
      height: 100% !important;
    `
  }  
`
const StFestivalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  h2 {
    width: 100%;
    font-size: 18px;
    word-break: keep-all;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
    &.titleMovie em {
      font-size: 13px;
      color: #858585;
    }
  }
  .info {
    overflow: hidden;
    overflow-y: auto;
    padding: 3px 0;
  }
  p {
    position: relative;
    font-size: 13px;
    gap: 10px;
    word-break: keep-all;
    padding-left: 100px;
    color: #454545;
    strong {
      position: absolute;
      top: -2px;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 90px;
      font-size: 12px;
      text-align: center;
      color: #000;
      background: #e5e5e5;
      border-radius: 5px;
      padding: 2px;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  ${
    mediaQuery.mobile`
      width: 100%;  
      padding: 20px 15px
    `
  }  
`;

const StVideoArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 5px 10px;
  margin: 0 0 10px;
  h2 {

  }
  div {
    flex: 1 0 45%;
    width: calc(50% - 5px);
  }
  iframe {    
    width: 100%;
    height: 150px;
    border-radius: 10px;
  }
  ${
    mediaQuery.mobile`
      order: 2;
      margin: 15px 0 0 0;
    `
  } 
`;

export default DetailPage;
