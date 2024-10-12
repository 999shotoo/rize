import { fetchSongsById } from "@/action/fetch";
import SongClientPage from "@/components/pages/song";

export default async function SongPage(params: { params: { id: string } }) {
  const id = params.params.id;
  const data = (await fetchSongsById(id)).data;

  return (
    <>
      <div className="flex flex-col bg-background text-foreground h-auto pb-20">
        <main className="flex-1 overflow-y-auto">
          <SongClientPage data={data} />
        </main>
      </div>
    </>
  );
}
