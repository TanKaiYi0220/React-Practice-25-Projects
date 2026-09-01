import React from 'react'

const UserCard = ({ user }) => {
    const {
        avatar_url,
        followers,
        following,
        public_repos,
        url,
        name,
        login,
        created_at
    } = user;

    const createdDate = new Date(created_at);

    return (
        <div className="userCard">
            <div className="avatarContainer">

                <img src={avatar_url} className="userAvatar" alt="User" />
            </div>

            <div className="urlContainer">
                <a className="userUrl" href={`https://github.com/${login}`}>{name || login}</a>
            </div>

            <div className="userInfo">
                <div className="userJoinedDate">
                    <p>User joined on</p>
                    <p>
                        User joined on
                        {
                            `  ${createdDate.getDate()} 
                        ${createdDate.toLocaleString("en-us", {
                                month: "short"
                            })}
                        ${createdDate.getFullYear()}`
                        }</p>
                </div>
                <div className="userPublicRepo">
                    <p>Public Repos</p>
                    <p>{public_repos}</p>
                </div>
                <div className="userFollowers">
                    <p>Followers</p>
                    <p>{followers}</p>
                </div>
                <div className="userFollowing">
                    <p>Following</p>
                    <p>{following}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard