import axios from "axios";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { MapPinned } from "lucide-react";
import { BookmarkButton } from "./BookmarkButton";
import { mediaQuery } from "@/core/utils/\bresponsive";
import useAuthStore from "@/core/store/authStore";

const API_KEY = "EAmfJivTLtIuFxBdgR718mbgrR%2BN3XR4h3PqrUjDyKVBhrj3Y%2FxGRE4vUicjWvf00JOirrM8pE4JZGHVCP33IQ%3D%3D";
// http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=EAmfJivTLtIuFxBdgR718mbgrR%2BN3XR4h3PqrUjDyKVBhrj3Y%2FxGRE4vUicjWvf00JOirrM8pE4JZGHVCP33IQ%3D%3D&pageNo=1&numOfRows=100&type=JSON
export function Festival({ map }) {
  const { userId } = useAuthStore();  
  const [festivalList, setFestivalList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFestivalsData = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `https://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&type=JSON`
        );
        // console.log("API Response:", response.data); // API 응답 구조 확인

        // 응답 데이터가 있는지 확인
        const festivalsArray = response.data.response.body.items;
        if (festivalsArray && Array.isArray(festivalsArray)) {
          // const newFestivalWithId = festivalsArray.map((festival) => {
          //   return { ...festival };
          // });
          // setFestivalList(newFestivalWithId);

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


  useEffect(() => {
    if (map && festivalList.length > 0) {
      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      festivalList.forEach((festival) => {
        const { latitude, longitude, fstvlCo } = festival;

        if (latitude && longitude) {
          const position = new kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude));

          const marker = new kakao.maps.Marker({
            position,
            map,
            image: markerImage
          });
          kakao.maps.event.addListener(marker, "click", () => {
            navigate(`/detailpage/${fstvlCo}?lat=${latitude}&lng=${longitude}`);
          });
        }
      });
    }
  }, [map, festivalList, navigate]);

  const handleOpenMapTab = (url) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const handleOpenDetailPage = (festival) => {
    navigate(`/detailpage/${festival.fstvlCo}?lat=${festival.latitude}&lng=${festival.longitude}`); // 위도, 경도 함께 전달
  };

  useEffect(() => {
    const getBookmarkFestivalList = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bookmarkFestivalList");
        if (response.statusText === "OK") {
          setBookmarkList(response.data);
        }        
      } catch (error) {
        console.log("북마크 불러오기 실패");
      }
    };
    getBookmarkFestivalList();
  }, []);
  

  return (
    <>
      <FestivalList>
        {festivalList.map((festival) => {
          return (
            <FestivalItem key={festival.id + festival.fstvlStartDate + festival.phoneNumber} className={bookmarkList.some((item) => festival.fstvlNm === item.fstvlNm && userId === item.userId) ? "isBookmarked" : ""}>
              <h2>{festival.fstvlNm}</h2>
              <li className="festivalDate">
                <span>일시</span> {festival.fstvlStartDate}
              </li>
              {festival.lnmadr && (
                <li className="festivalLocation">
                  <span>장소</span> {festival.lnmadr}
                </li>
              )}
              {festival.phoneNumber && (
                <li className="festivalTell">
                  <span>문의</span> {festival.phoneNumber}
                </li>
              )}
              <div className="btnArea">
                <button
                  className="kakao-map"
                  onClick={() =>
                    handleOpenMapTab(
                      `https://map.kakao.com/link/to/${festival.fstvlNm},${Number(festival.latitude)},${Number(festival.longitude)}`
                    )
                  }
                >
                  <MapPinned />
                </button>
                <button
                  onClick={
                    () => handleOpenDetailPage(festival) // 버튼 클릭 시 디테일 페이지로 이동
                  }
                >
                  상세보기
                </button>
                <BookmarkButton festival={festival} bookmarkList={bookmarkList} setBookmarkList={setBookmarkList} />
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
  height: calc(100vh - 135px);
  overflow: hidden;
  overflow-y: auto;
  padding: 15px;
  .isBookmarked {
    border: 2px solid #000;
    button:last-child {
      color: #fff;
      background: #959595;
    }
  }
  ${
    mediaQuery.tablet`
      max-width: 350px
    `
  }
  ${
    mediaQuery.mobile`
      order: 2;
      width: 100%;
      max-width: 100%;
      height: auto;
    `
  }
`;

const FestivalItem = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  list-style: none;
  box-shadow: 0.5px 0.5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 15px;
  h2 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 5px;
    padding: 0 0 5px;
    border-bottom: 1px solid #e5e5e5;
    word-break: keep-all;
    ${
      mediaQuery.tablet`
        font-size: 14px;
      `
    }
  }
  li {
    position: relative;
    min-height: 18px;
    font-size: 13px;
    padding-left: 40px;
    ${
      mediaQuery.tablet`
        font-size: 12px;
      `
    }
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
      word-break: keep-all;      
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
      height: 30px;
      font-size: 13px;
      background: white;
      border: 1px solid #858585;
      border-radius: 5px;
      transition: all 0.25s ease;
      &:hover {
        color: #fff;
        background: #7793df;
        border: 1px solid #7793df;
      }
      &.kakao-map {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        color: white;
        background: #3154b5;
        border: 1px solid #3154b5;
      }
      ${
      mediaQuery.tablet`
          font-size: 13px;
          height: 25px;
        `
      }
    }
  }
`;
