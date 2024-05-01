import { searchCategory } from "./types";

export type SearchBarProps = {
    searchCategory: searchCategory[];
    setSelectedOption: (value: any) => void;
    placeholder: string;
};

export type SearchBarState = {
    isSearchIconSelected: boolean;
    searchQuery: string;
    queriedDatas: any | null;
    filteredDatas: any | null;
    collections: string[];
    types: string[];
    selectedFilterType: string;
};