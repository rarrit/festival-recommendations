import { getFestivals } from "@/core/api/festivalAPI";
import { FESTIVAL_API } from "@/core/instance/baseInstance";
import useAuthStore from "@/core/store/authStore";
import { mediaQuery } from "@/core/utils/\bresponsive";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPage = () => {
  const navigate = useNavigate();
  const { nickname, userId } = useAuthStore();

  const { data, isPending, isError } = useQuery({
    queryKey: [FESTIVAL_API],
    queryFn: getFestivals
  });

  if (isPending) return <div>로딩중.</div>;
  if (isError) return <div>서버 에러</div>;

  const myFestivalList = data.filter((festival) => festival.userId === userId);
  const handleMoveDetail = (festival) => {
    navigate(`/detailpage/${festival.fstvlCo}?lat=${festival.latitude}&lng=${festival.longitude}`);
  };

  return (
    <StMyPageArea>
      <p className="nick">
        <span>{nickname}</span>님의 축제 리스트입니다.
      </p>
      <div className="festivalList">
        {myFestivalList && (
          <p className="festivalNum">
            저장된 축제 리스트: <span>{myFestivalList.length}</span>개
          </p>
        )}
        {myFestivalList ? (
          myFestivalList.map((festival) => {
            return (
              <div className="listItem" key={festival.fstvlNm}>                
                <h3 onClick={() => handleMoveDetail(festival)}>{festival.fstvlNm}</h3>
                <p>
                  <strong>축제 내용</strong>
                  {festival.fstvlCo}
                </p>
                <p>
                  <strong>일시</strong>
                  {festival.fstvlStartDate} - {festival.fstvlEndDate}
                </p>
                <p>
                  <strong>개최 장소</strong>
                  {festival.lnmadr}
                </p>
                <p>
                  <strong>전화번호</strong>
                  {festival.phoneNumber}
                </p>
              </div>
            );
          })
        ) : (
          <div className="listItem none">등록된 리스트가 없습니다.</div>
        )}
      </div>
    </StMyPageArea>
  );
};

const StMyPageArea = styled.div`
  min-height: calc(100% - 35px);
  padding: 30px;
  ${
    mediaQuery.mobile`
      padding: 30px 15px;
    `
  }   
  .nick {
    font-size: 36px;
    border-bottom: 1px solid #000;
    padding: 0 0 15px;
    margin: 0 0 15px;
    word-break: keep-all;
    span {
      font-size: 44px;
      font-weight: bold;
      color: #3154b5;
      ${
        mediaQuery.tablet`
          font-size: 36px;
        `
      }
      ${
        mediaQuery.mobile`
          font-size: 18px;
        `
      }    
    }
    ${
      mediaQuery.tablet`
        font-size: 24px;
        padding: 0 0 10px;
        margin: 0 0 10px;
      `
    }
    ${
      mediaQuery.mobile`
        font-size: 14px;
      `
    }    
  }
  .festivalList {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .festivalNum {
      font-size: 16px;
      margin: 0 0 20px;
      color: #333;
      ${
        mediaQuery.mobile`
          font-size: 12px;
          margin: 0 0 10px;
        `
      }   
      span {
        font-size: 18px;
        color: #3154b5;
        ${
          mediaQuery.mobile`
            font-size: 16px;
          `
        }   
      }
    }
    .listItem {
      padding: 10px 0;
      h3 {
        font-weight: bold;
        margin: 0 0 5px;
        padding: 0 0 5px;
        cursor: pointer;
        ${
          mediaQuery.mobile`
            font-size: 14px;
          `
        }   
      }
      p {
        position: relative;
        font-size: 13px;
        padding-left: 90px;
        color: #333;
        margin:0 0 2px;
        ${
          mediaQuery.mobile`
            font-size: 12px;
          `
        }    
        strong {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          font-size: 12px;
          color: #000;
          background: #dfdfdf;
          border-radius: 3px;
        }
      }
      &:not(:last-child) {
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
`;

export default MyPage;
