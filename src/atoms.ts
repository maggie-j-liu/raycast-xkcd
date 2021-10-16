import { atom } from "jotai";
export const maxNumAtom = atom(-1);
interface Status {
  [key: number]: boolean;
}
export const readStatusAtom = atom<Status>({});
