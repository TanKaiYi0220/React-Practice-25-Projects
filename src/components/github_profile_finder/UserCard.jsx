import React from 'react'

const UserCard = ({ user }) => {
    const {
        avatar_url,
        bio,
        created_at,
        followers,
        following,
        html_url,
        login,
        name,
        public_repos
    } = user;

    const createdDate = new Date(created_at);
    const formattedDate = createdDate.toLocaleDateString("en-us", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return (
        <div className="userCard">
            <div className="avatarContainer">
                <img src={avatar_url} className="userAvatar" alt={`${login} avatar`} />
            </div>

            <div className="userProfileContent">
                <div className="urlContainer">
                    <p className="profileLabel">GitHub Profile</p>
                    <a className="userUrl" href={html_url} target="_blank" rel="noreferrer">
                        {name || login}
                    </a>
                    <p className="userLogin">@{login}</p>
                </div>

                <p className="userBio">
                    {bio || "This user has not added a bio yet."}
                </p>

                <div className="userJoinedDate">
                    <span>Joined</span>
                    <strong>{formattedDate}</strong>
                </div>

                <div className="userInfo">
                    <div className="userPublicRepo">
                        <span>Repos</span>
                        <strong>{public_repos}</strong>
                    </div>
                    <div className="userFollowers">
                        <span>Followers</span>
                        <strong>{followers}</strong>
                    </div>
                    <div className="userFollowing">
                        <span>Following</span>
                        <strong>{following}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard