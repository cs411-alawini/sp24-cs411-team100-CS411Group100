import { fetchReq } from "../services/http";

export const searchNotifications = async (searchQuery, requestId, signal, searchCategory) => {
    try {
        let query = '';
        searchCategory.forEach((category, i) => {
            query += ((i !== 0) ? ',' : '') + category;
        })
        var response = await fetchReq('/api/search?searchKey='+searchQuery + '&searchAttribute='+ query, {
            method: "GET",
            signal: signal
        });
        if (response) {
            return {
                response,
                requestId: requestId,
                isSuccess: true
            }
        }
    } catch (error) {
        return {
            response: [],
            requestId: requestId,
            isSuccess: false
        };
    }
}

export const filterQueriedData = (filterType, queriedData) => {
    switch (filterType) {
        case 'employees':
            return { employees: queriedData[filterType] };
        case 'sectors':
            return { sectors: queriedData[filterType] };
        case 'divisions':
            return { divisions: queriedData[filterType] };
        case 'projects':
            return { projects: queriedData[filterType] };
    }
}