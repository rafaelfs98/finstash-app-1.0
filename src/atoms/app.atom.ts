import { atom } from "jotai";

export const selectedItemIdAtom = atom<string | null>(null);

export const modalOpened = atom<boolean>(false);
