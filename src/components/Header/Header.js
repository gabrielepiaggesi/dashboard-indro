import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../global.css';
import Button from '../../UI/Button/Button';
import classes from './Header.module.css';

const Header = (props) => {
    const navigate = useNavigate();
    const logoUrl = 'companylogo.webp';
    return (
        <div className={`flex fRow aCenter jBet pad15 boxSha ${classes.header}`}>
            <div className={`flex fRow aCenter gap5 cP`} onClick={() => navigate('/')}>
                <div className={classes.logo} style={{backgroundImage: `url(${logoUrl})`}}></div>
                <div className="brandName">Indro</div>
            </div>
            <div className="timer">
                <Button outline={true} onClick={props.onLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default Header;