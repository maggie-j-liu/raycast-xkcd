import { ActionPanel, Detail, OpenInBrowserAction, PushAction } from "@raycast/api";
import { useEffect, useState } from "react";
import OpenComic from "./open_comic";
import { BASE_URL, Comic, fetchComic } from "./xkcd";

const ComicPage = ({ maxNum, num }: { maxNum: number; num: number }) => {
  const [comicData, setComicData] = useState<Comic | null>(null);
  useEffect(() => {
    (async () => {
      const data = await fetchComic(num);
      setComicData(data);
    })();
  }, [num]);
  if (comicData === null) return <Detail isLoading />;
  const markdownString = `
# ${comicData.title} - #${comicData.num}

![${comicData.alt}](${comicData.img})

${comicData.alt}
`;
  return (
    <Detail
      markdown={markdownString}
      actions={
        <ActionPanel>
          <OpenInBrowserAction url={`${BASE_URL}/${num}/`} />
          {num !== 1 && <OpenComic maxNum={maxNum} num={num - 1} title="Previous Comic" />}
          {num !== maxNum && <OpenComic maxNum={maxNum} num={num + 1} title="Next Comic" />}
        </ActionPanel>
      }
    />
  );
};
export default ComicPage;
