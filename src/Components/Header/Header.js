import React from "react"
import "./Header.css"
import CollidrLogo from "../../assets/images/logo.svg"
import GithubLogo from "../../assets/images/github.png"

const Header = () => {
    return (
        <div id="Header">
            <div className="title">
                <a href="https://collidr.com/">
                    <img src={CollidrLogo} alt="Collidr logo"/>
                </a>
            </div>

            <div className="git">
                <a href="https://github.com/SasounTorossian" taget="_blank" rel="noopener noreferrer">
                    <img src={GithubLogo} alt="Github logo"/>
                </a>
            </div>
        </div>
    )
}

export default Header