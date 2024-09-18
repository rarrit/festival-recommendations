import useAuthStore from "@/core/store/authStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { geoFindMe } from "@/core/api/geoFindMe";
// import { displayCenterInfo } from "@/core/api/findAddress";

const Main = () => {
  const { state } = useLocation();
  const { setIsLoggedIn } = useAuthStore();

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState("");

  useEffect(() => {
    setIsLoggedIn(state);
  }, [state]);

  useEffect(() => {
    geoFindMe(setLocation);
  }, []);

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var geocoder = new kakao.maps.services.Geocoder();

    var coord = new kakao.maps.LatLng(location.latitude, location.longitude);
    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log("그런 너를 마주칠까 " + result[0].address.address_name + "을 못가");
      }
      setAddress(result[0].address.address_name);
    };

    const result = geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [location]);

  return (
    <StMain id="main">
      {/* <button id="find-me" onClick={() => displayCenterInfo(result, status)}>
        내 위치 보기
      </button> */}
      <p>내 현재 위치는 {address} 입니다</p>
      <br />
      <p id="status"></p>
      <a id="map-link" target="_blank"></a>
      <div id="map" style={{ width: "500px", height: "350px" }}></div>
    </StMain>
  );
};

const StMain = styled.div``;
export default Main;
