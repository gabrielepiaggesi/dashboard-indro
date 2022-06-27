import React, { useEffect, useState } from 'react';
import classes from './Quiz.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { loadJSON } from '../../utils';
import Button from '../../UI/Button/Button';
import Form from '../../UI/Form/Form';

const Quiz = () => {
    const navigate = useNavigate();
    const [tests, setQuiz] = useState(undefined);

    useEffect(() => {
        loadJSON('../testsSample.json')
        .then(sample => setQuiz(sample));
    }, []);

    if (!tests) return (<p>Loading...</p>);

    const onSaveHandler = (event) => {
        navigate('/', {replace: true});
    };

    return (
        <Card className="flex fColumn gap40 w80 mAuto pad20">
            <Form title="Configura Test" config={
                [
                    {
                        "label": "Argomanto Test",
                        "type": "text",
                        "key": "topic",
                        "tag": "input",
                        "placeholder": ""
                    },
                    {
                        "label": "Tempo totale a disposizione",
                        "key": "timer",
                        "tag": "select",
                        "options": ["5 minuti", "10 minuti", "15 minuti", "20 minuti", "25 minuti", "30 minuti", "40 minuti", "50 minuti", "60 minuti"]
                    }
                ]
            }>
                <div className="flex fRow aCenter gap15">
                    <input className={classes.checkInput} type="checkbox" />
                    <label>Foto Random durante il Test</label>
                </div>
                <div className="flex fRow aCenter gap15">
                    <input className={classes.checkInput} type="checkbox" />
                    <label>Registrazioni Random durante il test</label>
                </div>
            </Form>
            <p className={classes.title}>Domande</p>
            {tests.map((test, idx) =>
                <Card key={test.id} className="flex fColumn gap20 pad15">
                    <p className={classes.question}>{test.id} - {test.question.text}</p>
                    <Link to={'/test/' + test.id}><Button outline={true}>apri</Button></Link>
                </Card>
            )}
            <Link to={'/test/new'}><Button className="fBold">AGGIUNGI DOMANDA</Button></Link>
        </Card>
    );
};

export default Quiz;