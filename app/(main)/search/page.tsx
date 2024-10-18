import {
  fetchSearchAlbums,
  fetchSearchArtists,
  fetchSearchPlaylist,
  fetchSearchSongs,
} from "@/action/fetch";
import { CustomCards } from "@/components/cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  AwaitedReactNode,
  ReactPortal,
} from "react";

export default async function SearchPage(params: {
  searchParams: { q: string };
}) {
  const query = params.searchParams.q;
  const searchedSongs = await fetchSearchSongs(query);
  const searchedAlbums = await fetchSearchAlbums(query);
  const searchedArtists = await fetchSearchArtists(query);
  const searchedPlaylists = await fetchSearchPlaylist(query);
  if (query === "" || query === undefined) {
    redirect("/");
  }
  return (
    <>
      <div className="container p-6 mx-auto mb-10">
        <div>
          <h1 className="text-2xl font-bold">Search for "{query}"</h1>
        </div>
        <div className="my-6">
          <CustomCards data={searchedSongs.data.results} />
        </div>
        <div className="my-6">
          <h2 className="text-2xl pb-4 font-bold">PlayList :</h2>
          <CustomCards data={searchedPlaylists.data.results} />
        </div>
        <div className="my-6">
          <h2 className="text-2xl pb-4 font-bold">Albums :</h2>
          <CustomCards data={searchedAlbums.data.results} />
        </div>
        <div className="my-6">
          <h2 className="text-2xl pb-4 font-bold">Artists :</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {searchedArtists.data.results.map(
              (artist: {
                id: Key | null | undefined;
                image: any[];
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
                genre:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
                role:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
              }) => (
                <Link href={`/artist/${artist.id}`} key={artist.id}>
                  <Card className="overflow-hidden">
                    <CardHeader className="p-0">
                      <img
                        src={
                          artist.image?.find(
                            (image: { quality: string }) =>
                              image.quality === "500x500"
                          )?.url || "/placeholder.svg?height=48&width=48"
                        }
                        alt={artist.name?.toString() || ""}
                        width={400}
                        height={400}
                        className="object-cover transition-all hover:scale-105"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-md">{artist.name}</CardTitle>
                      <CardDescription>{artist.genre}</CardDescription>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {artist.role}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
