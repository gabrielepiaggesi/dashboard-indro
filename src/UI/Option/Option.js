import React from 'react';
import classes from './Option.module.css';

const Option = (props) => {
    const { text, selected, onClick } = props;
    return (
        <div onClick={onClick} className={`flex fRow gap15 br5 ${classes.box} ${selected ? classes.selected : ''}`}>
            <div className={classes.radioBtn}></div>
            <p className={classes.text}>{text}</p>
        </div>
    );
};

export default Option;