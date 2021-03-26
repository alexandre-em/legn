import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Results from '../../components/Body/Results/Results'
import { searchSheet } from '../../services/Api/Sheet'
import './SearchResult.css'
import Pagination from '@material-ui/lab/Pagination';

function SearchResult() {
    // const query = useQuery()
    const search = new URLSearchParams(useLocation().search)
    const [result, setResult] = useState()
    const [counter, setCounter] = useState(1)
    const [total, setTotal] = useState(0)
    const history = useHistory()

    useEffect(() => {
        searchSheet(search.get('keyword'), search.get('page')).then(data => {
            setResult(data.data.data)
            setTotal(data.data.pages)
        })
        // eslint-disable-next-line
    }, [search.get('keyword'), search.get('page')])


    return (
        <div className="search_results">
            <h1>{result && result.length} result{counter < 2 ? '' : 's'} for: "{search.get('keyword')}"</h1>
            {result && result.map(res => <Results key={'result_search'+res.id} result={res} /> )}
            <Pagination 
                page={JSON.parse(search.get('page')) || 1}
                className="search__pagination"
                count={total} 
                color="primary"
                onChange={(e, page) =>{
                    history.push(`/search?keyword=${search.get('keyword')}&page=${page}`)
                }}/>
        </div>
    )
}

export default SearchResult
