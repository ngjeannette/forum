import React from 'react';

const Liked = ({ liked, onClick, index }) => {
    if (onClick) {
        return (
            liked ? 
                <div className="likeAnswer">
                    <button onClick = { onClick } className = {`button icon ${liked && 'has-text-danger'}`}>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </button > 
                    <p>Answer Liked ! </p>
                </div>
                :
                <div className="likeAnswer">
                    <button onClick={onClick} className={`button icon ${liked && 'has-text-danger'}`}>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </button >
                    <p>Click to like answer</p>
                </div>
        )
    } else if (liked) {
        return (
            <div className="answerLiked">
                <span className={`icon has-text-danger`}> <i className="fa fa-heart" aria-hidden="true"></i></span>
                <p>Liked by owner</p>
            </div>
        )
    }
    return null;
}

const PostAnswer = ({ answer, index, onClick }) => {
    return (
        <>
            <Liked
                liked={answer.liked}
                onClick={onClick}
                index={index}
            />
            <div><h3>{answer.answer}</h3></div>
            <div><p>Answered by <strong>{answer.answerUsername}</strong></p></div>
            <time dateTime={answer.createdAt.substring(0, 10)}>{answer.createdAt.substring(0, 10)}</time>
            {
                answer.image.length > 0 &&
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={answer.image[0].location} alt={answer.image[0].originalname} />
                        </figure>
                    </div>
                </div>
            }
        </>
    )
}

export default PostAnswer;