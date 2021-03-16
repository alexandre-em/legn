import React from 'react'
import { useParams } from 'react-router'

function ChordSheet() {
    const { id } = useParams()
    return (
        <div>
           Sheet {id}
        </div>
    )
}

export default ChordSheet
