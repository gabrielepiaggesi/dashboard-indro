import React from 'react';
import classes from './CandidateProfile.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';

const CandidateProfile = (props) => {
    return (
        <div className={`${classes.CandidateProfile} flex fRow w80 mAuto gap20`}>
            <Card className="pad20 w20 hFitCont flex fColumn fCenter gap15">
                <div className="q150 divImage" style={{backgroundImage: `url(${'../companylogo.webp'})`}}></div>
                <p className="pL">Mario Rossi</p>
                <div className="flex fColumn fCenter gap5">
                    <p className="pM">Maschio, 25 Anni</p>
                    <p className="pM">Nato il 28/02/1997</p>
                    <p className="pM">piaggesigabriele@gmail.com</p>
                    <p className="pM">+393884661682</p>
                </div>
                <p className="pXL">8.5</p>
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