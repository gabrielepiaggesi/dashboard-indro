import React, { useEffect, useState } from 'react';
import classes from './JobOffer.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import { loadJSON } from '../../utils';

const JobOffer = (props) => {
    const [jobOffer, setJobOffer] = useState(undefined);

    useEffect(() => {
        loadJSON('../jobOffersSample.json')
        .then(sample => {
            const jobOffer = sample.find((jO) => jO.id === +props.id);
            setJobOffer(jobOffer);
        });
    }, []);

    if (!jobOffer) return (<p>Loading...</p>);

    return (
        <Card className="pad15 flex fColumn gap40">
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>{jobOffer.job.role}</p>
                <p>{jobOffer.job.address} - {jobOffer.job.city}, {jobOffer.job.country}</p>
            </div>
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>Job Descritpion</p>
                <p>{jobOffer.job.jobDescription}</p>
            </div>
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>Requirements</p>
                <p>{jobOffer.job.requirements}</p>
            </div>
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>Nice to have</p>
                <p>{jobOffer.job.niceToHave}</p>
            </div>
            <div className={`flex fColumn gap10 ${classes.section}`}>
                <p>General Info</p>
                <ul>
                    <li>Modalita Lavoro: <strong>{jobOffer.job.mode}</strong></li>
                    <li>Tipologia contratto: <strong>{jobOffer.job.type} - {jobOffer.job.contract}</strong></li>
                    <li>Dotazione fornita: <strong>{jobOffer.job.companyEquipment}</strong></li>
                    <li>Salario: <strong>{jobOffer.job.RAL}</strong></li>
                </ul>
            </div>
            <Button outline={true}>MODIFICA</Button>
        </Card>
    );
};

export default JobOffer;