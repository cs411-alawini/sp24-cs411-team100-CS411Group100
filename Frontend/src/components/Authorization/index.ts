import { getItem, removeItem, setItem } from "../../utils/localStorage";
import { getHashParameters, parseArguments } from "../../utils/location";
import { accessTokenLocalStorageKey, previousPageLocalStorageKey } from "./session";

export function redirectToLogin() {
    // Remove previously stored values if any
    removeItem(accessTokenLocalStorageKey);

    // Store the url to redirect back where the user started
    let storeWindowLocation = window.location.href;
    setItem(previousPageLocalStorageKey, storeWindowLocation);

    // window.location.assign(Environment.loginURL);
}

export function setLocationBeforeRedirect() {
    const prevLocation = getItem(previousPageLocalStorageKey);
    if (prevLocation) {
        removeItem(previousPageLocalStorageKey);
        window.location.assign(prevLocation);
    }
}

/**
 * Retrieve the arguments form the URL, and return it.
 */
export function getAccessTokenFromUrl() {
    const hashQueryParams = parseArguments(getHashParameters());
    const accessToken = hashQueryParams.access_token;
    const idToken = hashQueryParams.id_token;
    if (accessToken) {
        setItem(accessTokenLocalStorageKey, accessToken);
    }
    return accessToken;
}

export async function logout() {
    removeItem(accessTokenLocalStorageKey);
    // window.location.assign(Environment.loginURL);
};

export * from "./session";

