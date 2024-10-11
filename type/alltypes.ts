interface Song {
    id: string;
    name: string;
    type: string;
    year: string;
    releaseDate: string;
    duration: number;
    label: string;
    explicitContent: boolean;
    playCount: number;
    language: string;
    hasLyrics: boolean;
    lyricsId: string | null;
    url: string;
    copyright: string;
    album: {
      id: string;
      name: string;
      url: string;
    };
    artists: {
      primary: {
        id: string;
        name: string;
        role: string;
        image: {
          quality: string;
          url: string;
        }[];
        type: string;
        url: string;
      }[];
      featured: {
        id: string;
        name: string;
        role: string;
        image: {
          quality: string;
          url: string;
        }[];
        type: string;
        url: string;
      }[];
      all: (
        | {
            id: string;
            name: string;
            role: string;
            image: {
              quality: string;
              url: string;
            }[];
            type: string;
            url: string;
          }
        | {
            id: string;
            name: string;
            role: string;
            image: never[];
            type: string;
            url: string;
          }
      )[];
    };
    image: {
      quality: string;
      url: string;
    }[];
    downloadUrl: {
      quality: string;
      url: string;
    }[];
  }