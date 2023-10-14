function httpGetAsync(theUrl: string, callback: (xml: string) => any): any {
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);

    return;
}


function tenorCallbackSearch(responseText: string): any {
    const response_objects = JSON.parse(responseText);
    let top_10_gifs = response_objects["results"];

    let elem: any = document.querySelector('.preview_gif')

    elem.src = top_10_gifs[2]['media_formats']['nanogif']['url']
    return;
}


function grabData(): any {
    const apikey: string = "AIzaSyBgy8HxFMPvU4xJPQGr-EGjO0mtEMxTvZo";
    const clientKey: string = "gife_me_meme";
    const lmt = 10;
    const search_term = "excited";

    const search_url: string = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
        apikey + "&client_key=" + clientKey + "&limit=" + lmt;

    httpGetAsync(search_url, tenorCallbackSearch);

    return;
}

export {grabData}
