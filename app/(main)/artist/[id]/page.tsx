import { fetchArtistById } from "@/action/fetch";
import ArtistClientPage from "@/components/pages/artist";

export default async function SongPage(params: { params: { id: string } }) {
  const id = params.params.id;
  const data = (await fetchArtistById(id)).data;

  return (
    <>
      <div className="flex flex-col bg-background text-foreground h-auto pb-20">
        <main className="flex-1 overflow-y-auto">
          <ArtistClientPage data={data} />
        </main>
      </div>
    </>
  );
}
