import useAuthStore from "@/core/store/authStore";
import axios from "axios";
import { useState } from "react";

export function BookmarkButton({ festival, bookmarkList }) {
  const [bookmarkOn, setBookmarkOn] = useState(false);
  const { isLoggedIn, userId } = useAuthStore();

  const isBookmarked = bookmarkList.some((item) => {
    return festival.fstvlNm === item.fstvlNm && userId === item.userId;
  });

  console.log(isBookmarked);

  if (isLoggedIn) {
    const saveBookmark = async () => {
      try {
        const response = await axios.post("http://localhost:4000/bookmarkFestivalList", {
          ...festival,
          userId
        });
        console.log("API Response :", response.data);
        if (response.data.result === "SUCCESS") {
          setBookmarkOn(!bookmarkOn);
        }
      } catch (error) {
        console.log("북마크 저장 실패");
      }
    };

    return (
      <>
        {isBookmarked ? (
          <button onClick={() => saveBookmark(festival)}>취소하기</button>
        ) : (
          <button onClick={() => saveBookmark(festival)}>저장하기</button>
        )}
      </>
    );
  } else {
    const notLoginClick = () => {
      alert("로그인이 필요합니다.");
    };
    return <button onClick={() => notLoginClick()}>저장하기</button>;
  }
}
