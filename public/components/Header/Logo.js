import React from 'react'

const Logo = ({user}) => {
    return (
        <div className="logo">
            <h2 className="logo__content">IssueTracker</h2>
            {user && <p className="logo__logged-in-as">Logged in as {user.name }</p>}
        </div>
    )
}

export default Logo
