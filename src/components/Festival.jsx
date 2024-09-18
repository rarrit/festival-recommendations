import { useState } from "react";

export function Festival() {
  const [festivalList, setFestivalList] = useState([]);

  return (
    <>
      <div className="festivalList">
        {festivalList.map((festival) => {
          return (
            <ul>
              <li>{festival.title}</li>
              <li>{festival.title}</li>
              <li>{festival.title}</li>
              <li>{festival.title}</li>
            </ul>
          );
        })}
      </div>
    </>
  );
}
