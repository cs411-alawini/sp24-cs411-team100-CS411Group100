import { removeItem } from '../utils/localStorage';
import Environment from './../config/environment';
// import { accessTokenLocalStorageKey, getAccessTokenFromUrl, logout } from '../components/Authorization';

let accessToken: string = '';

export const apiURL = Environment.apiURL;

export const setToken = (token: string) => {
    if (token) {
        accessToken = token;
    }
};

export const fetchBlob = async (url: string, options: any, auth: boolean = true) => {
    return await fetchReq(url, options, 'blob', auth);
};

export const fetchText = async (url: string, options: any, auth: boolean = true) => {
    return await fetchReq(url, options, 'text', auth);
};

export const fetchReq = async (url: string, options: any, responseType?: string, auth: boolean = true) => {
    try {
        const response: any = auth ? await httpReq(url, options) : await fetch(url, options);
        if (response.ok) {
            removeItem('retryCount');
            return responseType === 'blob'
                ? await response.blob()
                : responseType === 'text'
                    ? await response.text()
                    : await response.json();
        }
        if (response.status === 401) {
            // logout();
            return;
        }
        return { error: (response.data && response.data.message) || response.statusText || 'Error' };
    } catch (error) {
        return { error };
    }
};

export const httpReq = async (url: string, options: any) => {
    if (accessToken) {
        const headers = options.headers || {};
        options.headers = {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...headers
        };
    }
    return fetch(url, options);
};

export const xmlHttpReq = async (url: string, options: any, setProgress: any = () => { }, requestRefObj: any = {}, tagId: any = () => '') => {
    const sendXhr = () => {
        return new Promise((resolve: any, reject: any) => {
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', event => {
                let percentage = (event.loaded / event.total) * 100;
                setProgress(percentage);
            });

            xhr.addEventListener('load', () => {
                if (xhr.status < 400) {
                    setProgress(100);
                    resolve(xhr.response);
                } else {
                    setProgress(0);
                    reject(xhr.statusText || 'Error');
                }
            });
            xhr.addEventListener('error', () => {
                setProgress(0);
                reject('Error');
            });

            requestRefObj.abort = () => xhr.abort();

            xhr.open(options.method, url);
            const headers = options.headers;
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
            xhr.send(options.body);

            xhr.onreadystatechange = function () {
                if (this.readyState === this.HEADERS_RECEIVED) {
                    tagId(xhr.getResponseHeader("etag"));
                }
            }

        });
    };
    try {
        const xhrRes = await sendXhr();
        return xhrRes;
    } catch (error) {
        return { error };
    }
};
