import React, { useEffect, useState } from 'react';
import classes from './JobOfferOverview.module.css';
import '../../global.css';
import JobOffer from '../JobOffer/JobOffer';
import JobOfferQuizList from '../JobOfferQuizList/JobOfferQuizList';
import JobOfferResults from '../JobOfferResults/JobOfferResults';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import { getJobOffer, getJobOfferQuizs, getJobOfferUserApplicationsList } from '../../lib/api';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const JobOfferOverview = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [overview, setOverview] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => getOverview(), []);

    const getOverview = () => {
        Promise.all([
            getJobOffer(params.jobOfferId),
            getJobOfferQuizs(params.jobOfferId),
            getJobOfferUserApplicationsList(params.jobOfferId)
        ])
        .then(data => {
            setOverview({
                jobOffer: data[0],
                quizs: data[1].quizs,
                results: data[2],
                link: 'https://localhost:3000/?jobOffer=' + data[0].link.uuid
            });
        })
        .catch(err => {
            setError(err);
            setOverview({});
            alert('Errore', error);
        })
    };

    if (!overview) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    const onOpenQuizHandler = (event, required) => {
        navigate('/quiz/'+event+'/'+params.jobOfferId+'/'+required);
    };

    return (
        <div className="flex fColumn gap40 w80 mAuto">
            <JobOfferResults jobOfferId={params.jobOfferId} link={overview.link} columns={overview.results.columns} results={overview.results.usersResults}/>
            <JobOfferQuizList 
                title="Test Competenze Richieste" 
                quizs={overview.quizs.filter(q => !!q.required)} 
                onOpenQuiz={(e) => onOpenQuizHandler(e, 1)} />
            <JobOfferQuizList 
                title="Test Competenze Bonus" 
                quizs={overview.quizs.filter(q => !q.required)} 
                onOpenQuiz={(e) => onOpenQuizHandler(e, 0)} />
            <Card className="flex fRow aCenter jBet pad20">
                <p className={classes.title}>Dati Candidato</p>
                <Button outline={true} onClick={() => navigate('/candidateForm/'+params.jobOfferId)}>MODIFICA</Button>
            </Card>
            <JobOffer jobOffer={overview.jobOffer} id={+params.jobOfferId} />
        </div>
    );
};

export default JobOfferOverview;