import React from 'react'

const StartupCard = ({post}: { post: StartupTypeCard }) => {
    return (
        <div>{post._createdAt}</div>
    )
}
export default StartupCard
