import { Detail, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchComic, Comic, maxNum } from "./xkcd";

export default function main() {
  const [comic, setComic] = useState<Comic | null>(null);
  const [num, setNum] = useState(-1);
  /*
  useEffect(() => {
    (async () => {
      const data = await fetchComic();
      setComic(data);
    })();
  }, [])
  */
  useEffect(() => {
    (async () => {
      const data = await maxNum();
      setNum(data);
    })();
  }, []);
  if (num < 0) return <List isLoading />;
  return (
    <List>
      <List.Section title="Commands">
        <List.Item title="Latest" subtitle="View the latest xkcd comic." />
        <List.Item title="Random" subtitle="View a random xkcd comic." />
      </List.Section>
      <List.Section title="xkcd Comics">
        {[...Array(num)].map((_, idx) => (
          <List.Item key={idx} title={`Comic #${num - idx}`} keywords={[num - idx + ""]} />
        ))}
      </List.Section>
    </List>
  );
  /*
  if (!comic) return <Detail isLoading/>;
  const markdownString = `
# ${comic.title}
#${comic.num}

![${comic.alt}](${comic.img})
`

  return <Detail markdown={markdownString} />;
  */
}
