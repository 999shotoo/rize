import { fetchhome } from "@/action/fetch";
import { CustomCards } from "@/components/cards";
import { Navbar } from "@/components/navbar";
import ThemeToggle from "@/components/theme/theme-toggle";
import Image from "next/image";

export default async function Home() {
  const homedata = await fetchhome();
  return (
    <>
      {/* <ThemeToggle /> */}

      <div className="container p-6 mx-auto">
        <div>
          <h2 className="text-2xl pb-4 font-bold">Trending :</h2>
          <CustomCards data={homedata.data.albums.data} />
        </div>
        <div className="my-6">
          <h2 className="text-2xl pb-4 font-bold">Top Charts :</h2>
          <CustomCards data={homedata.data.charts.data} />
        </div>
      </div>
    </>
  );
}
