import { PushAction, PushActionProps } from "@raycast/api";
import ComicPage from "./comic";
export const OpenComic = ({
  maxNum,
  num,
  ...props
}: {
  maxNum: number;
  num: number;
} & Partial<PushActionProps>) => {
  return <PushAction title={`Open Comic #${num}`} target={<ComicPage maxNum={maxNum} num={num} />} {...props} />;
};
export default OpenComic;

export const OpenRandomComic = ({ maxNum }: { maxNum: number }) => {
  const num = Math.floor(Math.random() * maxNum + 1);
  return <PushAction title={`Open a Random Comic`} target={<ComicPage maxNum={maxNum} num={num} />} />;
};
