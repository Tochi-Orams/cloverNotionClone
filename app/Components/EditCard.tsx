import React, { FC, useEffect, useState } from "react";

interface props {
  id: string;
  type: "image" | "text";
}

const EditCard: FC<props> = ({ type, id }) => {
  const [content, setContent] = useState();

  const fetchTextCard = async () => {
    try {
      const res = await fetch(`/api/text-card`, { body: id, method: "GET" });

      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const fetchImgCard = async () => {
    try {
      const res = await fetch(`/api/image-card`, { body: id, method: "GET" });

      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (type == "image") {
      fetchImgCard();
    } else {
      fetchTextCard();
    }
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] p-7 flex flex-col gap-8 overflow-auto">
      {type == "text" ? <div></div> : <div></div>}
    </div>
  );
};

export default EditCard;
