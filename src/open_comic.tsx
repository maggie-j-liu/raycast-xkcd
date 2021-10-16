import { PushAction } from "@raycast/api";
import ComicPage from "./comic";
export const OpenComic = ({ num }: { num: number }) => {
  return <PushAction title={`Open #${num}`} target={<ComicPage num={num} />} />;
};
export default OpenComic;

export const OpenRandomComic = ({ max }: { max: number }) => {
  const num = Math.floor(Math.random() * max + 1);
  return <PushAction title={`Open a random comic`} target={<ComicPage num={num} />} />;
};
