import { GitHub, Web } from '@material-ui/icons'
import React from 'react'
import { ReactComponent as ReactLogo } from '../../assets/images/undraw_page_not_found_su7k.svg'
import './NotFound.css'

function NotFound() {
    return (
        <div className="notfound">
            <ReactLogo />
            <h1>Page Not Found</h1>
            <div className="notfound__logos">
                <a className="notfound__logo" href="https://alexandre-em.netlify.app/">
                    <Web /> HomePage
                </a>
                <a className="notfound__logo" href="https://github.com/alexandre-em/legn">
                    <GitHub /> Code
                </a>
            </div>
            <p id="notfound__em">Made by EM</p>
        </div>
    )
}

export default NotFound
