import React, { useEffect, useState } from 'react';
import classes from './JobOfferOverview.module.css';
import '../../global.css';
import JobOffer from '../JobOffer/JobOffer';
import JobOfferQuizList from '../JobOfferQuizList/JobOfferQuizList';
import JobOfferResults from '../JobOfferResults/JobOfferResults';
import { loadJSON } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';

const JobOfferOverview = () => {
    const params = useParams();
    const navigate = useNavigate();

    const onOpenQuizHandler = (event) => {
        navigate('/quiz/'+event);
    };

    return (
        <div className="flex fColumn gap40 w80 mAuto">
            <JobOfferResults />
            <JobOfferQuizList title="Test Competenze Richieste" onOpenQuiz={onOpenQuizHandler} />
            <JobOfferQuizList title="Test Competenze Bonus" onOpenQuiz={onOpenQuizHandler} />
            <Card className="flex fRow aCenter jBet pad20">
                <p className={classes.title}>Dati Candidato</p>
                <Button outline={true} onClick={() => navigate('/candidateForm')}>MODIFICA</Button>
            </Card>
            <JobOffer id={+params.jobOfferId} />
        </div>
    );
};

export default JobOfferOverview;