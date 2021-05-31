import React from 'react'
import {BsSearch} from "react-icons/bs";

import './styles.css'

const StartPage = () => {

    return (
        <div>
            <BsSearch className="initial-logo" size={48}/>
            <div className="initial-text">
                Start with searching a GitHub user
            </div>
        </div>
    );
}

export default StartPage;