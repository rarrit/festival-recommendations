import useAuthStore from "@/core/store/authStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const { state } = useLocation();
  const { setIsLoggedIn } = useAuthStore();
  useEffect(() => {
    setIsLoggedIn(state);
  }, [state]);
  
  useEffect(() => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption); 
  }, [])
  return (
    <StMain id="main">
      <div id="map" style={{width:"500px" ,height:"350px"}}></div>
    </StMain>
  );
};

const StMain = styled.div``;
export default Main;
