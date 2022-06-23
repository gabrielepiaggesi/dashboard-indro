import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    const { type, disabled, className, onClick, outline, secondary } = props;
    return (
        <button
            type={type || 'button'}
            className={`br5 
                ${classes.button} 
                ${outline ? classes.outline : ''} 
                ${secondary ? classes.secondary : ''} 
                ${className} 
                ${disabled ? classes.disabled : ''}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;