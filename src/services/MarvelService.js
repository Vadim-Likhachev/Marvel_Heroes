class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=ba2b48306bc07df9a2133fb375959b80';
    _baseOffsetChars = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't  fetch ${url}, status $`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffsetChars) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description || 'Description for this character will be added later!',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;