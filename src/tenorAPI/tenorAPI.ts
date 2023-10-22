const apikey: string = "AIzaSyBgy8HxFMPvU4xJPQGr-EGjO0mtEMxTvZo";
const clientKey: string = "gife_me_meme";
const limit_gifs: number = 10;

function getURL(searchString: string): string {
    return "https://tenor.googleapis.com/v2/search?q="
        + searchString + "&key=" + apikey + "&client_key=" + clientKey
        + "&limit=" + limit_gifs + "&country=RU"
}

export {getURL}
