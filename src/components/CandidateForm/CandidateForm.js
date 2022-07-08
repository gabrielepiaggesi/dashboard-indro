import React, { useEffect, useState } from 'react';
import classes from './CandidateForm.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import { loadJSON } from '../../utils';
import Button from '../../UI/Button/Button';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { addJobOfferUserData, getJobOfferUserData, getUsersDataOptions, removejobOfferUserData } from '../../lib/api';
import { useParams } from 'react-router-dom';
import { candidateFormConfig } from './candidateFormConfig';

const CandidateForm = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [options, setOptions] = useState(undefined);


    useEffect(() => getDataOption(), []);

    const getDataOption = () => {
        setIsLoading(true);
        getUsersDataOptions()
        .then((data) => {
            getJobDataOption(data);
        })
        .catch(err => {
            alert(err.message);
            setIsLoading(false);
        });
    };

    const getJobDataOption = (dataOptions) => {
        setIsLoading(true);
        getJobOfferUserData(params.jobOfferId)
        .then((jobDataOptions) => {
            const opts = transformOptions(dataOptions, jobDataOptions);
            setOptions(opts);
            setIsLoading(false);
        })
        .catch(err => {
            alert(err.message);
            setIsLoading(false);
        });
    };

    const transformOptions = (dataOptions, jobDataOptions) => {
        return dataOptions.map(opt => {
            const configOpt = candidateFormConfig.find(cOpt => cOpt.key === opt.option_key);
            const jobOptionFound = jobDataOptions.find(jOpt => jOpt.option_id === opt.id);
            let newOpt = {
                text: configOpt.text || opt.option_key,
                checked: !!jobOptionFound,
                id: opt.id,
                key: opt.option_key,
                type: opt.type
            }
            return newOpt;
        });
    };

    const addOption = (option) => {
        setDisabled(true);
        addJobOfferUserData(params.jobOfferId, option.id)
        .then((data) => {
            setDisabled(false);
        })
        .catch(err => {
            setDisabled(false);
            alert(err.message);
            getDataOption();
        });
    };

    const removeOption = (option) => {
        setDisabled(true);
        removejobOfferUserData(params.jobOfferId, option.id)
        .then((data) => {
            setDisabled(false);
        })
        .catch(err => {
            setDisabled(false);
            alert(err.message);
            getDataOption();
        });
    };

    const onCheckChangeHandler = (event, option) => {
        const isChecked = event.target.checked;
        !isChecked && removeOption(option);
        isChecked && addOption(option);
    }

    if (isLoading || !options) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    return (
        <Card className={`${classes.CandidateForm} flex fColumn gap60 pad20 w80 mAuto`}>
            <p className={classes.title}>Richiedi queste informazioni ai Candidati</p>
            <div className="flex fColumn gap20">
                {options.map(check => 
                    <div className="flex fRow aCenter gap15" key={check.key}>
                        <input 
                            className={classes.checkInput} 
                            type="checkbox" 
                            defaultChecked={check.checked} 
                            disabled={disabled}
                            onChange={(event) => onCheckChangeHandler(event, check)} 
                        />
                        <label>{check.text}</label>
                    </div>
                )}
            </div>
            {/* <Button className="fBold">CONFERMA</Button> */}
        </Card>
    );
};

export default CandidateForm;