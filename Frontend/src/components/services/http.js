let accessToken = localStorage.getItem('token');

export const setToken = (token) => {
    if (token) {
        accessToken = token;
    }
};

export const fetchBlob = async (url, options, auth = true) => {
    return await fetchReq(url, options, 'blob', auth);
};

export const fetchText = async (url, options, auth = true) => {
    return await fetchReq(url, options, 'text', auth);
};

export const fetchReq = async (url, options, responseType, auth = true) => {
    try {
        const response = auth ? await httpReq(url, options) : await fetch(url, options);
        if (response.ok) {
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

export const httpReq = async (url, options) => {
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

export const xmlHttpReq = async (url, options, setProgress = () => { }, requestRefObj = {}, tagId = () => '') => {
    const sendXhr = () => {
        return new Promise((resolve, reject) => {
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
