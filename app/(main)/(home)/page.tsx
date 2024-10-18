import { fetchhome } from "@/action/fetch";
import { CustomCards } from "@/components/cards";
import ThemeToggle from "@/components/theme/theme-toggle";
import CustomImage from "@/components/ui/image";
import { getlanguage } from "@/hook/getcookies";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  AwaitedReactNode,
} from "react";

export default async function Home() {
  const language = getlanguage();
  const homedata = await fetchhome(language);
  const user = await currentUser();

  return (
    <>
      <div className="container p-6 mx-auto">
        <div className="hidden md:block">
          <h1 className="text-xl md:text-3xl font-bold mb-6">
            Good afternoon, {user?.username}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {homedata.data.charts.data
              .slice(0, 6)
              .map(
                (playlist: {
                  id: Key | null | undefined;
                  type: any;
                  image: string | any[];
                  name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                }) => (
                  <Link
                    key={playlist.id}
                    href={`/${playlist.type}/${playlist.id}`}
                    className="bg-card hover:bg-muted p-4 rounded-lg flex items-center space-x-4"
                  >
                    <CustomImage
                      src={
                        playlist.image &&
                        Array.isArray(playlist.image) &&
                        typeof playlist.image[0] === "object"
                          ? (playlist.image.find(
                              (image: any) => image.quality === "500x500"
                            ) ||
                              playlist.image[0] ||
                              {})[
                              typeof playlist.image.find(
                                (image: any) => image.quality === "500x500"
                              ) === "object" &&
                              playlist.image.find(
                                (image: any) => image.quality === "500x500"
                              ).link
                                ? "link"
                                : "url"
                            ]
                          : playlist.image
                      }
                      alt={`${playlist.name}`}
                      className="w-12 h-12 rounded-xl"
                      width={500}
                      height={500}
                    />
                    <span className="font-semibold">{playlist.name}</span>
                  </Link>
                )
              )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl pb-4 font-bold">Trending :</h2>
          <CustomCards data={homedata.data.trending.data} />
        </div>
      </div>
    </>
  );
}
