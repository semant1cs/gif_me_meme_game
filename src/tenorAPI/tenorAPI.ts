import axios from "axios";
import GameStore from "../Store/GameStore.ts";

const apikey: string = "AIzaSyBgy8HxFMPvU4xJPQGr-EGjO0mtEMxTvZo";
const clientKey: string = "gife_me_meme";

function isEmptyString(line: string): boolean {
    let lineArray = Array.from(line.trim())
    for (let symbol in lineArray) {
        if (symbol)
            return false
    }
    return true
}

function getNanoGifs(searchString: string, limit_gifs: number): void {
    if (isEmptyString(searchString)) return
    const respURL = "https://tenor.googleapis.com/v2/search?q="
    axios.get(respURL, {
        params: {
            q: searchString,
            key: apikey,
            client_key: clientKey,
            limit: limit_gifs
        }
    }).then((resp) => {
        const gifs = resp.data.results.map((result: any) => result.media_formats.nanogif.url);
        GameStore.setTestGifs(gifs)
    })
}

export {getNanoGifs}
