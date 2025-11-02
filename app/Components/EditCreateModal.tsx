import React, { Dispatch, FC, SetStateAction } from "react";
import { edit } from "../types/types";
import ImageForm from "./ImageForm";

interface props {
  edit: edit;
  setEdit: Dispatch<SetStateAction<edit>>;
}

const EditCreateModal: FC<props> = ({ edit, setEdit }) => {
  return (
    <div
      className={`fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full ${
        !edit.open ? "pointer-events-none" : ""
      }`}
    >
      {edit.open && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-md"
          onClick={() => setEdit({ open: false, id: -1, type: undefined })}
        />
      )}

      {edit.open && edit.type == "image" ? (
        <ImageForm id={edit.id} />
      ) : edit.open && edit.type == "text" ? (
        <div></div>
      ) : null}
    </div>
  );
};

export default EditCreateModal;
