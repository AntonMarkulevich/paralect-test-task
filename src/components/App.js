import React, {useState} from 'react'

import {AiFillGithub} from "react-icons/ai";
import {AiOutlineSearch} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
import {FaUserFriends} from "react-icons/fa"
import StartPage from "./StartPage";
import axios from "axios";
import {BiUser} from "react-icons/bi"
import {FiXSquare} from "react-icons/fi"

import "./styles.css"



const App = () => {
    const [term, setTerm] = useState('')
    const [results, setResult] = useState({})
    const [reps, setReps] = useState([])

    const submitInput = (e) => {
        e.preventDefault();
        const search = async () => {
            try {
                const {data} = await axios.get(`https://api.github.com/users/${term}`)
                setResult(data)
            } catch (e) {
                setResult(e.response)
                console.log(results)
            }
        }

        const searchReps = async () => {
            try {
                const {data} = await axios.get(`https://api.github.com/users/${term}/repos`)
                setReps(data)
            } catch (e) {
                setReps([])
            }
        }

        if (term && !results.length) {
            search();
            searchReps();
        }
        return false;
    }
    const openRep = (e, repos) => {
        e.preventDefault();
        window.open(repos.html_url)
    }
    const renderReps = reps.map(rep => {
        return (
            <div className="reps-content">
                <label className="reps-name" onClick={event => openRep(event, rep)}>
                    {rep.name}
                </label>
                <div className="reps-description">
                    {rep.description}
                </div>
            </div>
        )
    })
    const openUser = () => window.open(results.html_url)

    const renderUser = () => {
        return (
            <div>
                <div>
                    <img className="user-photo" src={results.avatar_url} alt="User"/>
                </div>
                <div className="user-info">
                    <div>
                        <label className="user-name">
                            {results.name}
                        </label>
                    </div>
                    <div>
                        <label className="user-login" onClick={openUser}>
                            {results.login}
                        </label>
                    </div>
                    <div className="user-follow">
                        <div className="user-follower"><FaUserFriends/> Followers: {results.followers} </div>
                        <div className="user-followings"><FaUserAlt/> Followings: {results.following} </div>
                    </div>
                </div>
            </div>
        )
    }
    const renderContent = (results) => {
        if (!Object.keys(results).length) {
            return (
                <div className="initial-state">
                    <StartPage/>
                </div>
            );
        } else if (results.status === 404) {
            return (
                <div className="no-user">
                    <BiUser className="no-user-logo" size={60}/>
                    <div className="no-user-text">
                        User not found
                    </div>
                </div>
            );
        } else if (reps.length === 0) {
            return (
                <div className="content">
                    <div className="user">
                        {renderUser()}
                    </div>
                    <div className="no-reps">
                        <FiXSquare className="no-reps-logo" size={48}/>
                        <div className="no-reps-text">
                            Repository list is empty
                        </div>
                    </div>
                </div>
            );
        } else if (Object.keys(results) && Object.keys(reps)) {
            return (
                <div className="content">
                    <div className="user">
                        {renderUser()}
                    </div>
                    <div>
                        <div className="reps">
                            Repositories ({reps.length})
                        </div>
                        {renderReps}
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="header">
                <div className="github-logo">
                    <AiFillGithub size={32}></AiFillGithub>
                </div>
                <div>
                    <div className="ui form">
                        <div className="field">
                            <form>
                                <AiOutlineSearch className="search"/>
                                <input
                                    value={term}
                                    onChange={e => setTerm(e.target.value)}
                                    onSubmit={event => submitInput(event)}
                                    className="input"/>
                                <input className="btn-ok" type="submit" value="Ok"
                                       onClick={event => submitInput(event)}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {renderContent(results)}
            </div>
        </div>
    );
}

export default App;