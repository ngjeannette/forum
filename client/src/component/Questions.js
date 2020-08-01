import React from 'react';
import { Link } from "react-router-dom";

const Questions = ({ items, sendIndividualQ }) => (
    <div className="card-container">
        {
            items.length > 0 ?
                items.map((item, index) => (
                    <div className="card" onClick={() => { sendIndividualQ(item._id, item.userID) }} key={index} >
                        {
                            item.image.length > 0 &&
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={item.image[0].location} alt={item.image[0].originalname} />
                                </figure>
                            </div>
                        }
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-4">{item.username}</p>
                                </div>
                            </div>
                            <div className="content">
                                {item.question}
                            </div>
                            <div className="content">
                                <time dateTime={item.updatedAt.substring(0, 10)}>{item.updatedAt.substring(0, 10)}</time>
                            </div>
                        </div>
                    </div>
                )) :
                <div className="notification">
                    <p>
                        <strong>Currently, you haven't created any questions, click here to </strong>
                        <Link to="/createQ"> Create Question </Link>
                    </p>
                </div>
        }
    </div>
);

Questions.displayName = 'Questions';

export default Questions;