import useAuthStore from "@/core/store/authStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { geoFindMe } from "@/core/api/geoFindMe";
import { Festival } from "@/components/Festival";
// import { displayCenterInfo } from "@/core/api/findAddress";

const Main = () => {
  const { state } = useLocation();
  const { setIsLoggedIn, accessToken } = useAuthStore();

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState("");

  const [map, setMap] = useState(null);

  useEffect(() => {
    accessToken ? setIsLoggedIn(true) : setIsLoggedIn(state)    
  }, [state]);

  useEffect(() => {
    geoFindMe(setLocation);
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(location.latitude, location.longitude), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

      // 지도를 표시할 div와  지도 옵션으로 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
      var geocoder = new kakao.maps.services.Geocoder();

      var coord = new kakao.maps.LatLng(location.latitude, location.longitude);
      var callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log("그런 너를 마주칠까 " + result[0].address.address_name + "을 못가");
        }
        setAddress(result[0].address.address_name);
      };

      const result = geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }
  }, [location]);

  return (
    <StMain id="main">
      <Festival map={map} />
      <StMapArea>
        <p className="myAddress">내 현재 위치는 <b>{address}</b> 입니다.</p>        
        <p id="status"></p>
        <a id="map-link" target="_blank"></a>
        <Map id="map" style={{ width: "100%", height: "calc(100vh - 144px)" }}></Map>
      </StMapArea>
    </StMain>
  );
};

const StMain = styled.div`
  display: flex;
  width: 100%;
`;
const StMapArea = styled.section`
  position: relative;
  width: calc(100% - 400px);
  .myAddress {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 100;   
    font-size: 13px; 
    font-weight: bold;
    background: rgba(255,255,255,.8);
    border-radius: 5px;
    box-shadow: 0.5px 0.5px 5px rgba(0, 0, 0, 0.4);
    padding: 10px;
    b {
      font-weight: bold;
      color: #3154b5;
    }
  }
`;
const Map = styled.div``;

export default Main;
