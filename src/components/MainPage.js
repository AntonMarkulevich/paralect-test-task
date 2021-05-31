import React, {useState} from "react"
import {FaUserAlt, FaUserFriends} from "react-icons/fa";
import StartPage from "./StartPage";
import {BiUser} from "react-icons/bi";
import {FiXSquare} from "react-icons/fi";
import Pagination from "./Pagination";

const MainPage = ({reps, results}) => {

    const [repsPerPage] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)

    const openRep = (e, repos) => {
        e.preventDefault();
        window.open(repos.html_url)
    }
    const lastRepIndex = currentPage * repsPerPage
    const firstRepIndex = lastRepIndex - repsPerPage
    const currentRep = reps.slice(firstRepIndex, lastRepIndex)
    const paginate = pageNumber => {setCurrentPage(pageNumber)}

    const renderReps = currentRep.map(rep => {
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
                        <Pagination
                            repsPerPage={repsPerPage}
                            totalReps={reps.length}
                            paginate={paginate}
                        />
                    </div>
                </div>
            );
        }
    }
    return (
        <div>
            {renderContent(results)}
        </div>
    )
}

export default MainPage