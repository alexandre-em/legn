import { useParams } from 'react-router'
import { tutos } from '../../constants/tuto'
import './Tuto.css'

function Tuto() {
    const { id } = useParams()

    return (
        tutos[id].page
    )
}

export default Tuto
