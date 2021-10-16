import { PushAction, PushActionProps } from "@raycast/api";
import { useAtom } from "jotai";
import { maxNumAtom } from "./atoms";
import ComicPage from "./comic";
export const OpenComic = ({
  num,
  ...props
}: {
  num: number;
} & Partial<PushActionProps>) => {
  return <PushAction title={`Open Comic #${num}`} target={<ComicPage num={num} />} {...props} />;
};
export default OpenComic;

export const OpenRandomComic = () => {
  const [maxNum] = useAtom(maxNumAtom);
  const num = Math.floor(Math.random() * maxNum + 1);
  return <PushAction title={`Open a Random Comic`} target={<ComicPage num={num} />} />;
};
