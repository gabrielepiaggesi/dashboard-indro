import React, { useEffect, useState } from 'react';
import classes from './JobOfferQuizList.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import { loadJSON } from '../../utils';

const JobOfferQuizList = (props) => {
    const [quizList, setQuizList] = useState(props.quizs || []);

    // useEffect(() => {
    //     loadJSON('../quizsSample.json')
    //     .then(sample => setQuizList(sample));
    // }, []);

    if (!quizList) return (<p>Loading...</p>);

    return (
        <Card className="flex fColumn gap40 w100 pad20">
            <p className={classes.title}>{props.title}</p>
            <div className="flex fRow fWrap gap20">
                    <Card key={0} className={`flex fColumn fCenter gap20 ${classes.quizCard}`}>
                        <Button outline={true} onClick={() => props.onOpenQuiz('new')}>CREA TEST</Button>
                    </Card>
                {quizList.map(quiz => 
                    <Card key={quiz.jq_id} className={`flex fColumn gap40 ${classes.quizCard}`}>
                        <p className={classes.quizTopic}>{quiz.topic}</p>
                        <Button outline={true} onClick={() => props.onOpenQuiz(quiz.jq_id)}>APRI</Button>
                    </Card>
                )}
            </div>
        </Card>
    );
};

export default JobOfferQuizList;