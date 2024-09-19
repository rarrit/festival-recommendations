import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import YouTube from "react-youtube";

const GetYoutube = () => {
  const queryClient = useQueryClient();
  const opts = {
    height: "300",
    width: "520",
  };

  const getYoutubeVideo = async (keyword) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=1&key=${
          import.meta.env.VITE_YOUTUBE_KEY
        }`
      );
      return data.items;
    } catch (error) {
      throw error;
    }
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["getVideo"],
    queryFn: () => getYoutubeVideo("가을축제"),
  });

  // useEffect(() => {
  //   // 컴포넌트 마운트 시에만 요청
  //   queryClient.prefetchQuery(["getVideo"], () => getYoutubeVideo("가을축제"));
  // }, []);

  if (isPending) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다</div>;
  }

  return (
    <>
      {data.map((video) => {
        return (
          <div key={video.id.videoId}>
            <h1 className="text-[24px] font-bold">{video.snippet.title}</h1>
            <YouTube videoId={video.id.videoId} opts={opts} onEnd={(e) => e.target.stopVideo(0)} />
          </div>
        );
      })}
    </>
  );
};

export default GetYoutube;
