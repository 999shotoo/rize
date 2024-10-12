import {
  fetchAlbumById,
  fetchPlaylistById,
  fetchSongsById,
} from "@/action/fetch";
import PlayListClientPage from "@/components/pages/playlist";

export default async function AlbumPage(params: { params: { id: string } }) {
  const id = params.params.id;
  const data = (await fetchPlaylistById(id)).data;

  return (
    <>
      <div className="flex flex-col bg-background text-foreground h-auto pb-20">
        <main className="flex-1 overflow-y-auto">
          <PlayListClientPage data={data} />
        </main>
      </div>
    </>
  );
}
