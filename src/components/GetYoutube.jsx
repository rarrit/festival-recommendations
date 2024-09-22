import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import YouTube from "react-youtube";

const GetYoutube = ({ keyword }) => {
  const queryClient = useQueryClient();
  const opts = {
    height: "200",
    width: "360"
  };

  const getYoutubeVideo = async (keyword) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=4&key=${
          import.meta.env.VITE_YOUTUBE_KEY
        }`
      );
      return data.items;
    } catch (error) {
      throw error;
    }
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["getVideo", keyword],
    queryFn: () => getYoutubeVideo(keyword),
    refetchOnWindowFocus: false
  });

  if (isPending) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>유튜브 api 당일 할당량을 초과했습니다.</div>;
  }  

  return (
    <>
      {data.map((video) => (
        <YouTube key={video.id.videoId} videoId={video.id.videoId} opts={opts} onEnd={(e) => e.target.stopVideo(0)} />
      ))}
    </>
  );
};

export default GetYoutube;
