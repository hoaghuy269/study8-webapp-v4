import {useContext} from "react";

import {SearchContext} from "../components/search/search-provider";

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error(
            'use-search.ts | Error | useSearch must be used within a SearchProvider'
        );
    }
    return context;
};