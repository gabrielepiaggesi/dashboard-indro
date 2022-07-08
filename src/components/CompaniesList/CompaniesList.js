import React, { useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import classes from './CompaniesList.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { Link } from 'react-router-dom';
import { getUserCompanies } from '../../lib/api';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const CompaniesList = () => {
    const [companiesList, setCompaniesList] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => getCompanies(), []);

    const getCompanies = () => {
        getUserCompanies()
        .then(data => setCompaniesList(data))
        .catch(err => {
            setError(err);
            setCompaniesList([]);
            alert('Errore', error);
        })
    };

    if (!companiesList) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    return (
        <div className="flex fColumn gap40 w80 mAuto pad20">
            <p className={classes.title}>Aziende</p>
            <div className="grid n4Col gap20">
                    <Card key={0} className={`flex fColumn fCenter gap20 ${classes.jobOfferCard}`}>
                    <Link to="/newCompany"><Button outline={true}>NUOVA</Button></Link>
                    </Card>
                {companiesList.map(company => 
                    <Card key={company.id} className={`flex fColumn gap20 ${classes.jobOfferCard}`}>
                        <p className={classes.jobTopic}>{company.name}</p>
                        <Link to={`/jobOffers/${company.id}`}><Button outline={true}>ENTRA</Button></Link>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default CompaniesList;