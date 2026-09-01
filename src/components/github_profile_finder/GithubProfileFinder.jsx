import React, { useState, useEffect } from 'react'
import './style.css'
import UserCard from './UserCard';

const GithubProfileFinder = () => {
    const [userName, setUserName] = useState("TanKaiYi0220");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSearchSubmit() {
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
            <div className="searchBox">
                <input
                    className="userNameInput"
                    type="text"
                    value={userName}
                    onChange={(e) => { setUserName(e.target.value) }}
                    placeholder="Search Github Username...">
                </input>
                <button onClick={handleSearchSubmit} className="searchBox">
                    Search
                </button>
            </div>
            {
                (userData)
                    ? <UserCard user={userData} />
                    : null
            }
        </div>
    )
}

export default GithubProfileFinder