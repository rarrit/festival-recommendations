import useAuthStore from "@/core/store/authStore";
import styled from "styled-components";

const MyPage = () => {
  const { nickname } = useAuthStore();
  const testMock = {
    auspcInsttNm : "강원특별자치도 춘천시청+(사)강원민예총 춘천지부",
    fstvlCo: "춘천예술문화축제  한여름 밤의 아리아",
    fstvlEndDate: "2024-08-14",
    fstvlNm: "2024춘천예술문화축제 - 제11회 한여름밤의 아리아",
    fstvlStartDate: "2024-08-14",
    homepageUrl: "",
    insttCode: "4181000",
    latitude: "37.874122",
    lnmadr: "강원특별자치도 춘천시 삼천동 223-2 KT&G상상마당 춘천아트센터",
    longitude: "127.702307",
    mnnstNm: "춘천민예총",
    opar: "상상마당 야외공연장",
    phoneNumber: "033-251-8907",
    rdnmadr: "강원특별자치도 춘천시 스포츠타운길399번길 25 어린이회관",
    referenceDate: "2024-05-27",
    relateInfo: "공연관람",
    suprtInsttNm: ""
  }
  return (
    <StMyPageArea>
      <p className="nick"><span>{nickname}</span>님의 축제 리스트입니다.</p>
      <div className="festivalList">
        일시: {testMock.fstvlStartDate}
        장소: {testMock.lnmadr}
        문의: {testMock.phoneNumber}
      </div>
    </StMyPageArea>
  )
}

const StMyPageArea = styled.div`
  min-height: calc(100% - 35px);  
  padding: 30px;
  .nick {
    font-size: 36px;
    span {
      font-size: 44px;
      font-weight: bold;
      color: #3154b5;
    }
  }
  .festivalList {
    border-top: 1px solid #e1e1e1;
    margin: 40px 0 0 0;
    padding: 40px 0 0 0;
  }
`

export default MyPage
