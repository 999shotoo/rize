// store.ts
import { create } from 'zustand';

// export type Song = {
//   id: number;
//   name: string;
//   artists: {
//     primary: {
//       name: string;
//     }[];
//   };
//   album: {
//     name: string;
//   };
//   duration: number;
//   image: {
//     quality: string;
//     url: string;
//   }[];
//   downloadUrl: {
//     quality: string;
//     url: string;
//   }[];
// };

type State = {
  activeMusic: Song | null;
  songs: Song[];
};

type Actions = {
  setActiveMusic: (song: Song) => void;
  setSongs: (songs: Song[]) => void;
};

export const useStoreSongs = create<State & Actions>((set) => ({
  activeMusic: null,
  setActiveMusic: (song: Song) => set({ activeMusic: song }),
  songs: [],
  setSongs: (songs: Song[]) => set({ songs }),
}));

export const Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const store = useStoreSongs();

  return ({ children });
};
