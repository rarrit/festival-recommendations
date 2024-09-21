import useAuthStore from "@/core/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function BookmarkButton({ festival, bookmarkList }) {
  const { isLoggedIn, userId } = useAuthStore();
  const queryClient = useQueryClient();

  const isBookmarked = bookmarkList.some((item) => {
    return festival.fstvlNm === item.fstvlNm && userId === item.userId;
  });

  console.log(isBookmarked);

  if (isLoggedIn) {
    const { data, isPending, isError } = useQuery({
      queryKey: ["bookmarkFestivalList"],
      queryFn: () => axios.get("http://localhost:4000/bookmarkFestivalList")
    });

    const saveBookmark = useMutation({
      mutationFn: () =>
        axios.post("http://localhost:4000/bookmarkFestivalList", {
          ...festival,
          userId,
          id: `${festival.fstvlNm}${userId}`
        }),
      onSuccess: () => {
        queryClient.invalidateQueries("bookmarkFestivalList");
      }
    });

    const deleteBookmark = useMutation({
      mutationFn: () => axios.delete(`http://localhost:4000/bookmarkFestivalList/${festival.fstvlNm}${userId}`),
      onSuccess: () => {
        queryClient.invalidateQueries("bookmarkFestivalList");
      }
    });
    console.log(festival.id);

    if (isPending) {
      return <div>로딩중입니다...</div>;
    }

    if (isError) {
      return <div>데이터 조회 중 오류가 발생했습니다.</div>;
    }

    return (
      <>
        {isBookmarked ? (
          <button onClick={() => deleteBookmark.mutate(festival)}>취소하기</button>
        ) : (
          <button onClick={() => saveBookmark.mutate(festival)}>저장하기</button>
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
