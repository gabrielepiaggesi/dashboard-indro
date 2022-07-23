import React, { useContext, useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import classes from './CompaniesList.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { getUserCompanies } from '../../lib/api';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import AppContext from '../../store/app-context';

const CompaniesList = () => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();
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

    const navigateToCompany = (id) => {
        console.log(id);
        navigate(`/jobOffers/${id}`);
    }

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
                        <Button outline={true} onClick={() => {ctx.setCompany(company.id); navigateToCompany(company.id);} }>ENTRA</Button>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default CompaniesList;