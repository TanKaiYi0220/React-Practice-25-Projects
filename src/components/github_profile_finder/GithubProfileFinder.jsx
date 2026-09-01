import React, { useState, useEffect } from 'react'
import './style.css'
import UserCard from './UserCard';

const GithubProfileFinder = () => {
    const [userName, setUserName] = useState("TanKaiYi0220");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSearchSubmit(event) {
        console.log("Submitted")
        event.preventDefault();
        fetchGithubUserData();
    }

    async function fetchGithubUserData() {
        setLoading(true);
        try {
            const res = await fetch(`https://api.github.com/users/${userName}`)
            const data = await res.json();

            if (data) {
                console.log(data);
                setUserData(data);
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGithubUserData();
    }, [])

    return (
        <div className="githubProfileFinderContainer">
            <div className="githubFinderPanel">
                <div className="githubFinderHeader">
                    <p className="githubFinderEyebrow">GitHub API</p>
                    <h1>Profile Finder</h1>
                    <p className="githubFinderDescription">
                        Search a username and preview the account profile, activity numbers, and join date.
                    </p>
                </div>

                <form className="searchBox" onSubmit={handleSearchSubmit}>
                    <input
                        className="userNameInput"
                        type="text"
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value) }}
                        placeholder="Search GitHub username...">
                    </input>

                    <button
                        type="submit"
                        className="searchButton"
                        disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>

                {loading && <p className="githubStatusText">Loading GitHub profile...</p>}

                {
                    userData
                        ? <UserCard user={userData} />
                        : null
                }
            </div>
        </div>
    )
}

export default GithubProfileFinder