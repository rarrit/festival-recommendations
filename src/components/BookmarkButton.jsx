import useAuthStore from "@/core/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function BookmarkButton({ festival, bookmarkList, setBookmarkList }) {
  const { isLoggedIn, userId } = useAuthStore();
  const queryClient = useQueryClient();

  const isBookmarked = bookmarkList.some((item) => {    
    return festival.fstvlNm === item.fstvlNm && userId === item.userId;
  });  

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
        setBookmarkList((prevList) => [...prevList, { ...festival, userId }]);
        queryClient.invalidateQueries("bookmarkFestivalList");
      }
    });

    const deleteBookmark = useMutation({
      mutationFn: () => axios.delete(`http://localhost:4000/bookmarkFestivalList/${festival.fstvlNm}${userId}`),
      onSuccess: () => {
        setBookmarkList((prevList) => prevList.filter((item) => item.fstvlNm !== festival.fstvlNm));
        queryClient.invalidateQueries("bookmarkFestivalList");
      }
    });    

    const handleSaveClick = () => {
      if (isBookmarked) {
        deleteBookmark.mutate();
      } else {
        saveBookmark.mutate();
      }
    };

    if (isPending) {
      return <div>로딩중입니다...</div>;
    }

    if (isError) {
      return <div>데이터 조회 중 오류가 발생했습니다.</div>;
    }

    return (
      <>
        {isBookmarked ? (
          <button onClick={handleSaveClick}>취소하기</button>
        ) : (
          <button onClick={handleSaveClick}>저장하기</button>
        )}
      </>
    );
  } else {
    const notLoginClick = () => {
      alert("로그인이 필요합니다.");
    };
    return <button onClick={notLoginClick}>저장하기</button>;
  }
}
