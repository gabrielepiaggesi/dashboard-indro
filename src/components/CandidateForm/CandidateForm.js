import React, { useEffect, useState } from 'react';
import classes from './CandidateForm.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { loadJSON } from '../../utils';
import Button from '../../UI/Button/Button';

const CandidateForm = () => {
    const [checks, setChecks] = useState(undefined)

    useEffect(() => {
        loadJSON('../jobChecks.json')
        .then(sample => setChecks(sample));
    }, []);

    if (!checks) return (<p>Loading...</p>);

    return (
        <Card className={`${classes.CandidateForm} flex fColumn gap60 pad20 w80 mAuto`}>
            <p className={classes.title}>Richiedi queste informazioni ai Candidati</p>
            <div className="flex fColumn gap20">
                {checks.map(check => 
                    <div className="flex fRow aCenter gap15" key={check.key}>
                        <input className={classes.checkInput} type="checkbox" defaultChecked={check.checked} disabled={check.disabled} />
                        <label>{check.text}</label>
                    </div>
                )}
            </div>
            <Button className="fBold">CONFERMA</Button>
        </Card>
    );
};

export default CandidateForm;