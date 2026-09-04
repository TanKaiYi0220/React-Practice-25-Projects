import React, { useEffect, useState } from 'react'
import "./style.css"
import SuggestionDropdown from './SuggestionDropdown';

const SearchAutoComplete = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    function handleUserChange(event) {
        const query = event.target.value.toLowerCase();
        setSearchParams(event.target.value);

        if (query.length > 1) {
            const filteredData = users
                ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
                : [];
            setFilteredUsers(filteredData);
            setShowDropdown(true);
        } else {
            setFilteredUsers([]);
            setShowDropdown(false);
        }
    }

    function handleSuggestionClicked(selectedUser){
        setSearchParams(selectedUser);
        setShowDropdown(false);
        setFilteredUsers([]);
    }

    async function fetchUserLists() {
        setLoading(true);

        try {
            const response = await fetch("https://dummyjson.com/users");
            const data = await response.json();

            if (data) {
                setUsers(data.users.map((userItem) => (userItem.firstName)));
            }
        } catch {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserLists();
    }, [])

    return (
        <div className="searchAutoCompleteContainer">
            <div className="searchAutoCompletePanel">
                <div className="searchAutoCompleteHeader">
                    <p className="searchAutoCompleteEyebrow">User Directory</p>
                    <h1>Search Auto Complete</h1>
                </div>

                <div className="searchBox">
                    {
                        (loading)
                            ? <p className="searchStatusText">Waiting Loading</p>
                            : <input
                                className="searchUsers"
                                placeholder="Search Users Here..."
                                value={searchParams}
                                onChange={(e) => handleUserChange(e)} />
                    }
                    {
                        (showDropdown)
                            ? <SuggestionDropdown data={filteredUsers} handleClicked={handleSuggestionClicked}></SuggestionDropdown>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchAutoComplete