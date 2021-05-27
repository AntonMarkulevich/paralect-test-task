import React, {useState} from 'react'

import {AiFillGithub} from "react-icons/ai";
import StartPage from "./StartPage";
import axios from "axios";

import "./styles.css"


const App = () => {
    const [term, setTerm] = useState('')
    const [results, setResult] = useState({})
    const [reps, setReps] = useState([])


    const submitInput = (e) => {
        e.preventDefault();
        const search = async () => {
            const {data} = await axios.get(`https://api.github.com/users/${term}`)
            const {dataReps} = await axios.get(`https://api.github.com/users/${term}/repos`)
            setReps(dataReps)
            setResult(data)
            console.log(results);
        }

        if (term && !results.length) {
            search();
        }

        return false;
    }
    const renderUser = (results) => {
        if (!Object.keys(results).length) {
            return (
                <div className="initial-state">
                   <StartPage/>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }

    const renderedReps = (reps) => {

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
            <div className="ui celled list">
                {renderUser(results)}
            </div>
        </div>
    );
}

export default App;