import React, { useEffect, useState } from 'react';
import classes from './JobOfferResults.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import Grid from '../../UI/Grid/Grid';
import { loadJSON } from '../../utils';
import { useNavigate } from 'react-router-dom';

const defaultColumnProperties = {
    sortable: true
  };

const columns = [
    {
      key: "fullName",
      name: "Nome Cognome",
      sortDescendingFirst: true
    },
    {
      key: "age",
      name: "Eta"
    },
    {
      key: "gender",
      name: "Sesso"
    },
    {
      key: "personality",
      name: "Personalita"
    },
    {
        key: "yearsExperienceOnThisJob",
        name: "Anni di Esperienza"
    },
    {
      key: "test1Score",
      name: "Test 1"
    },
    {
      key: "test2Score",
      name: "Test 2"
    },
    {
      key: "test3Score",
      name: "Test 3"
    },
    {
      key: "answers",
      name: "Risposte/30"
    },
    {
      key: "globalScore",
      name: "Voto"
    }
  ].map(c => ({ ...c, ...defaultColumnProperties }));
  

const JobOfferResults = (props) => {
    const [results, setResults] = useState(props.results || []);
    const navigate = useNavigate();

    // useEffect(() => {
    //     loadJSON('../jobOfferResultsSample.json')
    //     .then(sample => setResults(sample));
    // }, []);

    if (!results) return (<p>Loading...</p>);

    const onRowClickHandler = (row, rowIdx) => {
      navigate('/profile/' + row.id);
    };

    return (
        <Card className="flex fColumn gap20 w100 pad20">
            <p className={classes.title}>Classifica Candidati</p>
            <p className={classes.link}>Link da condividere sul web o ai candidati: https://google.com</p>
            <Grid height={300} columns={columns} rows={results} onRowClick={onRowClickHandler} noRowsMessage="Ancora nessun candidato da mostrare, invia il link qui sopra ai candidati." />
        </Card>
    );
};

export default JobOfferResults;