"use server";

import { redirect } from "next/navigation";

export async function fetchhome() {
    const response = await fetch(`${process.env.API_URL_1}/modules`, { cache: "no-store" })
    const data = await response.json()
    return data
}

export async function fetchAlbumById(id: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/albums?id=${id}`)
    const data = await response.json()
    return data
}

export async function fetchSongsById(id: string) {
    const fetchsongData = await fetch(`${process.env.API_URL_2}/api/songs/${id}`);
    const songData = await fetchsongData.json();
    const fetchsuggestionData = await fetch(`${process.env.API_URL_2}/api/songs/${id}/suggestions?limit=10000000`);
    let suggestionData = await fetchsuggestionData.json();

    if (!suggestionData.success) {
        const fetchsuggestionDataQ0QweNrE = await fetch(`${process.env.API_URL_2}/api/songs/Q0QweNrE/suggestions?limit=10000000`);
        suggestionData = await fetchsuggestionDataQ0QweNrE.json();
    }

    const combineData = { data: { song: songData, suggestions: suggestionData } }
    return combineData;
}

export async function fetchPlaylistById(id: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/playlists?id=${id}&limit=1000000`)
    const data = await response.json()
    return data
}

export async function fetchSongById(id: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/songs/${id}`)
    const data = await response.json()
    return data
}

export async function fetchLyricsById(id: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/songs/${id}/lyrics`)
    const data = await response.json()
    return data
}

export async function fetchSearchSongs(query: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/search/songs?query=${query}`)
    const data = await response.json()
    return data
}

export async function fetchSearchAlbums(query: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/search/albums?query=${query}`)
    const data = await response.json()
    return data
}

export async function fetchSearchArtists(query: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/search/artists?query=${query}`)
    const data = await response.json()
    return data
}

export async function fetchSearchPlaylist(query: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/search/playlists?query=${query}`)
    const data = await response.json()
    return data
}

export async function searchAction(data: FormData) {
    return redirect("/search?q=" + data.get("search"));
};