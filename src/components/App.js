import React, {useState} from 'react'
import Loader from "react-loader-spinner"
import {AiFillGithub} from "react-icons/ai";
import {AiOutlineSearch} from "react-icons/ai"
import MainPage from "./MainPage";
import axios from "axios";


import "./styles.css"




const App = () => {
    const [term, setTerm] = useState('')
    const [results, setResult] = useState({})
    const [reps, setReps] = useState([])
    const [loading, setLoading] = useState(true)




    const submitInput = (e) => {
        e.preventDefault();
        const search = async () => {
            try {
                setLoading(false)
                const {data} = await axios.get(`https://api.github.com/users/${term}`)
                setResult(data)
            } catch (e) {
                setResult(e.response)
                console.log(results)
            } finally {
                setLoading(true)
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
                {loading ? (<MainPage reps={reps} results={results}/>) : <Loader
                    className="Loader"
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />}

            </div>
        </div>
    );
}

export default App;