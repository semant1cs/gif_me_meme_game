import axios from "axios";
import answerStore from "../Store/GameStores/AnswerStore";

const clientKey: string = "gife_me_meme";


function isEmptyString(line: string): boolean {
    const lineArray = Array.from(line.trim())
    for (const symbol in lineArray) {
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
            key: import.meta.env.VITE_API_KEY,
            client_key: clientKey,
            limit: limit_gifs
        }
    }).then((resp) => {
        const gifs = resp.data.results.map((result: any) => result.media_formats.nanogif.url);
        answerStore.setTestGifs(gifs)
    })
}

export {getNanoGifs}
