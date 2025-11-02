export type typeType = "image" | "text";

export type cardType = {
  id: number;
  type: typeType;
  name: string;
  image_source?: string;
  content?: string;
  width?: number;
  height?: number;
};

export type edit = {
  open: boolean;
  id: number;
  type: typeType | undefined;
};
