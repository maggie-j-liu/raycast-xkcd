import { Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import { Comic, fetchComic } from "./xkcd";

const ComicPage = ({ num }: { num: number }) => {
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
  return <Detail markdown={markdownString} />;
};
export default ComicPage;
