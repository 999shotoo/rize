// store.ts
import { create } from 'zustand';

export type Song = {
  id: number;
  name: string;
  type: string;
  artists: {
    primary: {
      name: string;
    }[];
  };
  album: {
    name: string;
  };
  duration: number;
  image: {
    quality: string;
    url: string;
  }[];
  downloadUrl: {
    quality: string;
    url: string;
  }[];
};

type State = {
  activeMusic: Song | null;
  songs: Song[];
  currentTime: number; // Add currentTime to the state
  duration: number; // Add duration to the state
};

type Actions = {
  setActiveMusic: (song: Song) => void;
  setSongs: (songs: Song[]) => void;
  setCurrentTime: (time: number) => void; // Action to set current time
  setDuration: (duration: number) => void; // Action to set duration
};

export const useStoreSongs = create<State & Actions>((set) => ({
  activeMusic: null,
  songs: [],
  currentTime: 0,
  duration: 0,
  setActiveMusic: (song: Song) => set({ activeMusic: song }),
  setSongs: (songs: Song[]) => set({ songs }),
  setCurrentTime: (time: number) => set({ currentTime: time }),
  setDuration: (duration: number) => set({ duration }),
}));

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return {children};
};