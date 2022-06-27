import React, { useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import classes from './JobOffersList.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { loadJSON } from '../../utils'
import { Link } from 'react-router-dom';

const JobOffersList = (props) => {
    const [jobOffersList, setJobOffersList] = useState(undefined);

    useEffect(() => {
        loadJSON('jobOffersSample.json')
        .then(sample => setJobOffersList(sample));
    }, []);

    if (!jobOffersList) return (<p>Loading...</p>);

    return (
        <div className="flex fColumn gap40 w80 mAuto pad20">
            <p className={classes.title}>Posizioni Lavorative Aperte</p>
            <div className="grid n4Col gap20">
                    <Card key={0} className={`flex fColumn fCenter gap20 ${classes.jobOfferCard}`}>
                    <Link to="/new"><Button outline={true}>NUOVA</Button></Link>
                    </Card>
                {jobOffersList.map(jobOffer => 
                    <Card key={jobOffer.job.id} className={`flex fColumn gap20 ${classes.jobOfferCard}`}>
                        <p className={classes.jobTopic}>{jobOffer.job.role}</p>
                        <div className={classes.details}>
                            <p>{jobOffer.job.mode}</p>
                            <p>{jobOffer.job.contract}</p>
                            <p>{jobOffer.job.city},{jobOffer.job.country}</p>
                            <p>Creata il {jobOffer.job.createdAt}</p>
                        </div>
                        <Link to={`/jobOffer/${jobOffer.job.id}`}><Button outline={true}>APRI</Button></Link>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default JobOffersList;