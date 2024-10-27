import {
  fetchSearchAlbums,
  fetchSearchArtists,
  fetchSearchPlaylist,
  fetchSearchSongs,
} from "@/action/fetch";
import { CustomCards } from "@/components/cards";
import { CardContent } from "@/components/ui/card";
import CustomImage from "@/components/ui/image";
import { Link } from "next-view-transitions";

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
  const searchedArtists = await fetchSearchArtists(query);
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
        <div className="my-6">
          {searchedArtists.data?.results?.length > 0 && (
            <>
              <h2 className="text-2xl pb-4 font-bold">Artists:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ">
                {searchedArtists.data.results.map((item: any) => (
                  <div
                    key={item.id}
                    className="w-full max-w-sm overflow-hidden group"
                  >
                    <div className="relative">
                      <CustomImage
                        src={
                          item.image && typeof item.image === "string"
                            ? item.image
                            : (item.image.find(
                                (image: any) => image.quality === "500x500"
                              ) ||
                                item.image[0] ||
                                {})[
                                typeof item.image.find(
                                  (image: any) => image.quality === "500x500"
                                ) === "object" &&
                                item.image.find(
                                  (image: any) => image.quality === "500x500"
                                ).link
                                  ? "link"
                                  : "url"
                              ]
                        }
                        alt="Card Image"
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-50 rounded-xl"
                      />
                    </div>
                    <Link href={`/${item.type}/${item.id}`}>
                      <CardContent className="p-4">
                        <div className="font-semibold truncate">
                          {item.name}
                        </div>
                        <div className="text-sm truncate">{item.subtitle}</div>
                      </CardContent>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
