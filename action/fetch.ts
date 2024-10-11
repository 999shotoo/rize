"use server";

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
    const fetchsuggestionData = await fetch(`${process.env.API_URL_2}/api/songs/${id}/suggestions`);
    const suggestionData = await fetchsuggestionData.json();
    const combineData = { data: { song: songData, suggestions: suggestionData } }
    return combineData;
}

export async function fetchPlaylistById(id: string) {
    const response = await fetch(`${process.env.API_URL_2}/api/playlists?id=${id}`)
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