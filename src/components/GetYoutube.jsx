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
    queryKey: ["getVideo", keyword],
    queryFn: () => getYoutubeVideo(keyword)
  });

  if (isPending) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다</div>;
  }
  console.log(data);

  return (
    <>
      {data[0] ? (
        <YouTube videoId={data[0].id.videoId} opts={opts} onEnd={(e) => e.target.stopVideo(0)} />
      ) : (
        <p>관련된 영상이 없습니다.</p>
      )}
    </>
  );
};

export default GetYoutube;
