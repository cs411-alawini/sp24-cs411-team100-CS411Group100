export function getUrl() {
    return window.location.hostname;
}

export function getHash() {
    return window.location.hash;
}

export function setHash(hash: string) {
    window.location.hash = hash;
}

type QueryParams = { [key: string]: string };

/**
 * Parse the string of hash parameters, into a QueryParams object.
 * @param hash the string of hash parameters to parse.
 */
export function parseArguments(hash: string): QueryParams {
    const hashQueryParams: QueryParams = {};

    hash.split('&').forEach(argValuePair => {
        const pair = argValuePair.split('=');
        if (pair.length === 2) {
            hashQueryParams[pair[0]] = pair[1];
        }
    });
    return hashQueryParams;
}

/**
 * Normalize the string of hash parameters, so that is starts with the first parameter key, rather than a # or /.
 */
export function getHashParameters() {
    let hash = getHash();
    if (hash) {
        hash = hash.substring(1);
    }
    return hash;
}
