import React, { useContext, useEffect, useState } from 'react';
import classes from './Quiz.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadJSON } from '../../utils';
import Button from '../../UI/Button/Button';
import Form from '../../UI/Form/Form';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { addQuiz, getJobOfferQuiz, removeQuiz } from '../../lib/api';
import AppContext from '../../store/app-context';
import { quizConfig } from './quizConfig';

const Quiz = () => {
    const navigate = useNavigate();
    const params = useParams();
    const ctx = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [tests, setTests] = useState([]);
    const [formInputs] = useState(quizConfig);
    const [formValue, setFormValue] = useState(undefined);

    useEffect(() => { getQuiz(); }, []);

    if (isLoading) return (<div className="flex fCenter"><LoadingSpinner /></div>);

    const getQuiz = () => {
        const quizId = params.quizId;
        if (quizId !== 'new') {
            setIsLoading(true);
            getJobOfferQuiz(quizId)
            .then((data) => { 
                setFormValue({...data.jQuiz, ...data.quiz}); 
                setTests(data.tests);
                setIsLoading(false); 
            })
            .catch(err => {
                setIsLoading(false); 
                console.log(err);
            });
        }
    }

    const onSaveHandler = (newFormValue) => {
        const data = { 
            ...formValue, 
            ...newFormValue,
            job_offer_id: +params.jobOfferId, 
            required: +params.required, 
            company_id: +ctx.companyId 
        }
        setFormValue(data);
        addQuiz(data, params.quizId)
        .then(() => { setFormValue(undefined); navigate(-1); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    };

    const onDeleteQuizHandler = () => {
        setIsLoading(true)
        removeQuiz(params.quizId)
        .then(() => { setFormValue(undefined); navigate(-1, {replace: true}); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
            navigate(-1, {replace: true});
        });
    }

    return (
        <Card className="flex fColumn gap40 w80 mAuto pad20">
            <Form title="Configura Test" config={formInputs} defaultValues={formValue} onSave={onSaveHandler} />
            <p className={classes.title}>Domande</p>
            {tests.map((test, idx) =>
                <Card key={test.id} className="flex fColumn gap20 pad15">
                    <p className={classes.question}>{test.id} - {test.question}</p>
                    <Link to={'/test/' + test.id + '/' + params.quizId + '/' + (tests.length+1)}><Button outline={true}>apri</Button></Link>
                </Card>
            )}
            <Link to={'/test/new/' + params.quizId + '/' + (tests.length+1)}><Button className="fBold">AGGIUNGI DOMANDA</Button></Link>

            {params.quizId !== 'new' && <Button outline={true} onClick={onDeleteQuizHandler}>ELIMINA TEST</Button>}
        </Card>
    );
};

export default Quiz;