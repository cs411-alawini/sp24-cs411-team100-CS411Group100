import { getItem } from '../../utils/localStorage';

export const accessTokenLocalStorageKey = 'Auth.AccessToken';
export const previousPageLocalStorageKey = 'PreviousPageLocation';

/**
 * Retrieve the current user access token from local storage.
 */
export function getAccessToken() {
    const accessToken = getItem(accessTokenLocalStorageKey);
    if (!accessToken) {
        return '';
    }
    return accessToken;
}