import { ActionPanel, allLocalStorageItems, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { maxNum } from "./xkcd";
import { OpenComic, OpenRandomComic } from "./open_comic";

interface Status {
  [key: number]: boolean;
}
export default function main() {
  const [num, setNum] = useState(-1);
  const [readStatus, setReadStatus] = useState<Status>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const data = await maxNum();
      setNum(data);
      const items = await allLocalStorageItems();
      console.log(items);
      for (const [key, val] of Object.entries(items)) {
        if (key.startsWith("read:comic:")) {
          const comicNum = Number(key.slice("read:comic:".length));
          readStatus[comicNum] = val;
        }
      }
      console.log(readStatus);
      setReadStatus({ ...readStatus });
      setLoading(false);
    })();
  }, []);

  if (loading) return <List isLoading />;
  return (
    <List>
      <List.Section title="Commands">
        <List.Item
          title="Random"
          subtitle="View a random xkcd comic."
          actions={
            <ActionPanel>
              <OpenRandomComic maxNum={num} />
            </ActionPanel>
          }
        />
        <List.Item
          title="Latest"
          subtitle="View the latest xkcd comic."
          actions={
            <ActionPanel>
              <OpenComic maxNum={num} num={num} />
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
                <OpenComic maxNum={num} num={num - idx} />
              </ActionPanel>
            }
            icon={readStatus[num - idx] ? Icon.Checkmark : Icon.XmarkCircle}
          />
        ))}
      </List.Section>
    </List>
  );
}
