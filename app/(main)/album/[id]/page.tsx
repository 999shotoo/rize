import { fetchAlbumById, fetchSongsById } from "@/action/fetch";
import AlbumClientPage from "@/components/pages/album";

export default async function AlbumPage(params: { params: { id: string } }) {
  const id = params.params.id;
  const data = (await fetchAlbumById(id)).data;

  return (
    <>
      <div className="flex flex-col bg-background text-foreground h-auto pb-20">
        <main className="flex-1 overflow-y-auto">
          <AlbumClientPage data={data} />
        </main>
      </div>
    </>
  );
}
