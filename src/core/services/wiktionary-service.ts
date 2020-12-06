const WIKTIONARY_ENDPOINT = 'wiktionary.org/w/api.php';
const DEFAULT_PARAMS = 'action=query&prop=iwlinks&format=json&origin=*';

class WiktionaryService {
  static async translate(word: string, fromLanguage: string, toLanguage?: string, limit = 100): Promise<{ word: string, originalWord: string, languageCode: string }[]> {
    // Modified from http://jsfiddle.net/karlb/PxfrJ/11/

    // Build and send request
    let params = `&titles=${word}&iwlimit=${limit}&${DEFAULT_PARAMS}`;
    if (toLanguage) {
      params = `iwprefix=${toLanguage}` + params;
    }

    const url = `https://${fromLanguage}.${WIKTIONARY_ENDPOINT}?${params}`;
    const request = await fetch(url);
    
    // Parse response
    const response = await request.json();
    if (!response.query || !response.query.pages  ) {
      throw new Error('Issue with request');
    }

    const pages = response.query.pages;
    const words = pages[Object.keys(pages)[0]].iwlinks;

    if (!words || !words.length) {
      // throw new Error(`No results found for ${word} in \'${toLanguage}\'`);
      throw new Error(`No results found for some translations`);
    }

    return words.map((translatedWord: { '*': string, prefix: string }) => {
      return { originalWord: word, word: translatedWord['*'], languageCode: translatedWord.prefix }
    });
  }
}

export default WiktionaryService;