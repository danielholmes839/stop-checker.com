import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-lodash-debounce";
import { searchQuery } from "api";
import { StopPreview, Page, IndentedParagraph, LoadingSpinner } from "components";


const SearchQuery = ({ search, setLoading }) => {
    let { data, loading, error } = useQuery(searchQuery(search))

    useEffect(() => setLoading(false))
    if (loading) { return null; }
    if (error) { return null; }

    return (
        <div>
            {data.stops.map(stop => <StopPreview key={stop.id} stop={stop} />)}
        </div>
    )
}


const Search = () => {
    let [search, setSearch] = useState("");
    let [loading, setLoading] = useState(false);
    let debouncedSearch = useDebounce(search, 700);

    return (
        <Page title={"Search"}>
            <IndentedParagraph>Find your stop! Search by name or 4 digit stop code</IndentedParagraph>
            <input
                type="text"
                className="form-control mb-1"
                placeholder="Search: Hurdman, Tunneys, 3021, 3023..."
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                    setLoading(true);
                }}
            />
            {debouncedSearch.length > 0 && <SearchQuery search={debouncedSearch} setLoading={setLoading} />}

            {loading && (<LoadingSpinner/>)}
        </Page>
    )
}

export default Search