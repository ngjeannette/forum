import React from 'react';

const UserQ = ({ item, deleteItem, displayDelete, index }) => (
    <div key={`${index}-100`}>
        {displayDelete && <button className="button is-danger" onClick={() => { deleteItem() }}>Delete Question</button> }
        <p>Asked by <strong>{item.username}</strong></p>
        {
            item.image.length > 0 &&
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={item.image[0].location} alt={item.image[0].originalname} />
                    </figure>
                </div>
            </div>
        }
    </div>
);

export default UserQ;