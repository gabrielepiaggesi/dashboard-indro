import React, { useContext, useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import classes from './JobOffersList.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getCompanyJobOffers } from '../../lib/api';
import AppContext from '../../store/app-context';

const JobOffersList = () => {
    const params = useParams();
    const ctx = useContext(AppContext);
    const [jobOffersList, setJobOffersList] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => { ctx.setCompany(params.companyId); getJobOffers(); }, []);

    const getJobOffers = () => {
        getCompanyJobOffers(params.companyId)
        .then(data => setJobOffersList(data))
        .catch(err => {
            setError(err);
            setJobOffersList([]);
            alert('Errore', error);
        })
    };

    if (!jobOffersList) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    return (
        <div className="flex fColumn gap40 w80 mAuto pad20">
            <p className={classes.title}>Posizioni Lavorative Aperte</p>
            <div className="grid n4Col gap20">
                    <Card key={0} className={`flex fColumn fCenter gap20 ${classes.jobOfferCard}`}>
                    <Link to={`/newJobForm/${params.companyId}/new`}><Button outline={true}>NUOVA</Button></Link>
                    </Card>
                {jobOffersList.map(jobOffer => 
                    <Card key={jobOffer.id} className={`flex fColumn gap20 ${classes.jobOfferCard}`}>
                        <p className={classes.jobTopic}>{jobOffer.role}</p>
                        <div className={classes.details}>
                            <p>{jobOffer.mode}</p>
                            <p>{jobOffer.contract_type}</p>
                            <p>{jobOffer.city},{jobOffer.country}</p>
                            <p>Creata il {jobOffer.created_at.substring(0,10)}</p>
                        </div>
                        <Link to={`/jobOffer/${jobOffer.id}`}><Button outline={true}>APRI</Button></Link>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default JobOffersList;