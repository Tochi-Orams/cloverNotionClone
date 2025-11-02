import React, { Dispatch, FC, SetStateAction } from "react";
import { cardType, edit } from "../types/types";
import { Image, Text } from "lucide-react";

interface props extends Partial<cardType> {
  index: number;
  setEdit: Dispatch<SetStateAction<edit>>;
}

const Block: FC<props> = ({ id, name, type, index, setEdit }) => {
  return (
    <button
      type="button"
      onClick={() => setEdit({ open: true, id: id!, type: type! })}
      className="flex gap-4 items-center px-4 py-2 rounded-xl bg-white w-fit"
    >
      {type == "image" ? (
        <Image size={16} className="text-black" />
      ) : (
        <Text size={16} className="text-black" />
      )}
      <p className="text-black">{name}</p>
    </button>
  );
};

export default Block;
