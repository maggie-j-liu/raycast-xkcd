import { ActionPanel, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { maxNum } from "./xkcd";
import { OpenComic, OpenRandomComic } from "./open_comic";

export default function main() {
  const [num, setNum] = useState(-1);
  useEffect(() => {
    console.log("useeffect");
    (async () => {
      const data = await maxNum();
      setNum(data);
    })();
  }, []);
  if (num < 0) return <List isLoading />;
  return (
    <List>
      <List.Section title="Commands">
        <List.Item
          title="Random"
          subtitle="View a random xkcd comic."
          actions={
            <ActionPanel>
              <OpenRandomComic max={num} />
            </ActionPanel>
          }
        />
        <List.Item
          title="Latest"
          subtitle="View the latest xkcd comic."
          actions={
            <ActionPanel>
              <OpenComic num={num} />
            </ActionPanel>
          }
        />
      </List.Section>
      <List.Section title="xkcd Comics">
        {[...Array(num)].map((_, idx) => (
          <List.Item
            key={num - idx}
            title={`Comic #${num - idx}`}
            keywords={[num - idx + ""]}
            actions={
              <ActionPanel>
                <OpenComic num={num - idx} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
