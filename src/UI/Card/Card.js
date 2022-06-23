import React from 'react';
import '../../global.css';

const Card = (props) => {
    return (
        <div className={`bgrW br5 boxSha ${props.className}`}>{props.children}</div>
    );
};

export default Card;