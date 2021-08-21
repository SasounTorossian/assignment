import React from "react"
import "./Header.css"
import CollidrLogo from "../../assets/images/download.svg"

const Header = () => {
    return (
        <div id="Header">
            <div className="name">Sasoun Torossian</div>
            <div className="title"><img src={CollidrLogo} alt="Collidr logo"/></div>
            <div className="git">Git</div>
        </div>
    )
}

export default Header