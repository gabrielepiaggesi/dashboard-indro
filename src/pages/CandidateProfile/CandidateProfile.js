import React from 'react';
import classes from './CandidateProfile.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';

const CandidateProfile = (props) => {
    return (
        <div className={`${classes.CandidateProfile} flex fRow w80 mAuto gap20`}>
            <Card className="pad20 w20 hFitCont">
                <p>Mario Rossi</p>
            </Card>
            <Card className="pad20 w80 hFCon">
                <p>Mario Rossi</p>  
                <p>Mario Rossi</p>  
                <p>Mario Rossi</p>  
            </Card>
        </div>
    );
};

export default CandidateProfile;