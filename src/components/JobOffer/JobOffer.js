import React, { useEffect, useState } from 'react';
import classes from './JobOffer.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import { loadJSON } from '../../utils';
import { Link } from 'react-router-dom';

const JobOffer = (props) => {
    const [jobOffer, setJobOffer] = useState(props.jobOffer?.jOffer || undefined);
    const [skills, setSkills] = useState(props.jobOffer?.skills || undefined);

    // useEffect(() => {
    //     loadJSON('../jobOffersSample.json')
    //     .then(sample => {
    //         const jobOffer = sample.find((jO) => jO.id === +props.id);
    //         setJobOffer(jobOffer);
    //     });
    // }, []);

    if (!jobOffer) return (<p>Loading...</p>);

    return (
        <Card className="pad15 flex fColumn gap40">
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>{jobOffer.role}</p>
                <p>{jobOffer.address} - {jobOffer.city}, {jobOffer.country}</p>
            </div>
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>Job Descritpion</p>
                <p>{jobOffer.description}</p>
            </div>
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>Requirements</p>
                <ul>
                    {skills.filter(s => !!s.required).map(sk => <li key={sk.id}><strong>{sk.text}</strong></li>)}
                </ul>
            </div>
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>Nice to have</p>
                <ul>
                    {skills.filter(s => !s.required).map(sk => <li key={sk.id}><strong>{sk.text}</strong></li>)}
                </ul>
            </div>
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>General Info</p>
                <ul>
                    <li>Modalita Lavoro: <strong>{jobOffer.mode}</strong></li>
                    <li>Tipologia contratto: <strong>{jobOffer.type} - {jobOffer.contract_type}</strong></li>
                    <li>Dotazione fornita: <strong>{jobOffer.equipment}</strong></li>
                    <li>Salario: <strong>{jobOffer.salary_range}</strong></li>
                </ul>
            </div>
            <Link to={`/newJobForm/${jobOffer.company_id}/${jobOffer.id}`}><Button outline={true}>MODIFICA</Button></Link>
        </Card>
    );
};

export default JobOffer;