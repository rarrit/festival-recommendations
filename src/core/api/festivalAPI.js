import { FESTIVAL_API } from "../instance/baseInstance";

export const getFestivals = async () => {
  const response = await FESTIVAL_API.get("/bookmarkFestivalList");
  return response.data;
};
