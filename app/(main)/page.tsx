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
        <CustomCards data={homedata.data.albums.data} />
        <CustomCards data={homedata.data.charts.data} />
      </div>
    </>
  );
}
