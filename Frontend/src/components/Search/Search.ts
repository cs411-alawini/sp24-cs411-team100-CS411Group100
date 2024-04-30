import { fetchReq } from "../../../../services/http";
import serviceURLs from "../../../../services/serviceUrls";
import { searchCategory } from "./types";
const {
    searchUrl,
} = serviceURLs;

export const searchNotifications = async (searchQuery: string, requestId: number, signal: any, searchCategory: searchCategory[]) => {
    try {
        let query = '';
        searchCategory.forEach((category, i) => {
            query += ((i !== 0) ? ',' : '') + category.name;
        })
        let url = searchUrl(searchQuery.trim()) + query;
        var response = await fetchReq(url, {
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

export const filterQueriedData = (filterType: string, queriedData: any) => {
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