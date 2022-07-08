import React, { useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import '../../global.css';
import { loadJSON } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Form from '../../UI/Form/Form';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { addCompany } from '../../lib/api';

const NewCompanyForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formInputs, setFormInputs] = useState(undefined);

    useEffect(() => {
        loadJSON('newCompanyInputs.json')
        .then(sample => setFormInputs(sample));
    }, []);

    if (isLoading || !formInputs) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    const onSaveHandler = (formValue) => {
        setIsLoading(true);
        addCompany(formValue)
        .then(() => navigate('/'))
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    };

    return (
        <Card className="flex fColumn gap20 pad20 w80 mAuto">
            <Form title="Nuova Azienda" config={formInputs} onSave={onSaveHandler} />
        </Card>
    );
};

export default NewCompanyForm;