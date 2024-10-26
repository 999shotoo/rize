import {
  fetchSearchAlbums,
  fetchSearchArtists,
  fetchSearchPlaylist,
  fetchSearchSongs,
} from "@/action/fetch";
import { CustomCards } from "@/components/cards";

export default async function SearchPage(params: {
  searchParams: { q: string };
}) {
  let query = params.searchParams.q;
  if (query === "" || query === undefined) {
    query = "latest";
  }
  const searchedSongs = await fetchSearchSongs(query);
  const searchedAlbums = await fetchSearchAlbums(query);
  const searchedPlaylists = await fetchSearchPlaylist(query);
  return (
    <>
      <div className="container p-6 mx-auto mb-10">
        <div>
          <h1 className="text-2xl font-bold">Search for "{query}"</h1>
        </div>
        <div className="my-6">
          {searchedSongs.data?.results?.length > 0 && (
            <>
              <CustomCards data={searchedSongs.data.results} />
            </>
          )}
        </div>
        <div className="my-6">
          {searchedPlaylists.data?.results?.length > 0 && (
            <>
              <h2 className="text-2xl pb-4 font-bold">Playlists:</h2>
              <CustomCards data={searchedPlaylists.data.results} />
            </>
          )}
        </div>
        <div className="my-6">
          {searchedAlbums.data?.results?.length > 0 && (
            <>
              <h2 className="text-2xl pb-4 font-bold">Albums:</h2>
              <CustomCards data={searchedAlbums.data.results} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
