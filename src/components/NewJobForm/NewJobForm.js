import React, { useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import '../../global.css';
import { loadJSON } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../UI/Form/Form';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { addJobOffer, addJobOfferSkill, deleteJobOfferSkill, getJobOffer, updateJobOffer, updateJobOfferSkill } from '../../lib/api';
import { jobFormConfig } from './jobForm.config';

const transformDate = (dateString) => {
    const date = new Date(dateString);
    const localeString = date.toISOString().substring(0,10);
    return localeString;
}

const NewJobForm = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [formInputs, setFormInputs] = useState(jobFormConfig);
    const [dto, setDto] = useState(undefined);

    useEffect(() => getJob(), []);

    const getJob = () => {
        const jobOfferId = params.jobOfferId;
        if (jobOfferId === 'new') return;
        setIsLoading(true);
        getJobOffer(jobOfferId)
        .then((data) => {
            const newData = transformDataToFormValue(data);
            console.log(newData);
            setDto(newData);
            setIsLoading(false); 
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    }

    const onSaveHandler = (formValue) => {
        setDto(formValue);
        setIsLoading(true);
        const data = transformFormValue(formValue);
        if (params.jobOfferId === 'new') newJobOffer(data);
        if (params.jobOfferId !== 'new') editJobOffer(data.jobOffer);
    };

    const newJobOffer = (data) => {
        setIsLoading(true);
        addJobOffer(data)
        .then(() => navigate(-1))
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    }

    const editJobOffer = (data) => {
        setIsLoading(true);
        updateJobOffer(data, params.jobOfferId)
        .then(() => navigate(-1))
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    }

    const transformFormValue = (formValue) => {
        let dto = { jobOffer: null, skills: null };
        const requiredSkills = formValue.requiredSkills.map(text => ({ required: 1, text }));
        const bonusSkills = formValue.bonusSkills.map(text => ({ required: 0, text }));
        dto.skills = requiredSkills.concat(bonusSkills);
        delete formValue.requiredSkills;
        delete formValue.bonusSkills;
        dto.jobOffer = formValue;
        dto.jobOffer['company_id'] = params.companyId;
        dto.jobOffer['contract_timing'] = dto.jobOffer.type;
        return dto;
    }

    const transformDataToFormValue = (data) => {
        return {
            ...data.jOffer,
            expired_at: transformDate(data.jOffer.expired_at),
            created_at: transformDate(data.jOffer.expired_at),
            requiredSkills: data.skills.filter(s => !!s.required).map((skill) => ({ id: skill.id, value: skill.text, key: skill.id, saved: true })),
            bonusSkills: data.skills.filter(s => !s.required).map((skill) => ({ id: skill.id, value: skill.text, key: skill.id, saved: true }))
        }
    };

    const onSaveItem = (key, item, idx) => {
        console.log(key, item, idx);
        item.required = key === 'requiredSkills';
        if (params.jobOfferId === 'new') return;
        if (item.id) updateSkill(item);
        if (!item.id) addSkill(item);
    }

    const onDeleteItem = (key, item, idx) => {
        console.log(key, item, idx);
        if (item.id) deleteSkill(item);
    }

    const updateSkill = (skill) => {
        setIsLoading(true);
        const data = {
            ...skill,
            text: skill.value,
        }
        updateJobOfferSkill(data, data.id)
        .then(() => { getJob(); })
        .catch(err => {
            alert(err.message);
            getJob();
            setIsLoading(false); 
        });
    }

    const addSkill = (skill) => {
        setIsLoading(true);
        console.log(dto);
        const data = {
            ...skill,
            text: skill.value,
            job_offer_id: dto.id,
        }
        addJobOfferSkill(data)
        .then(() => { getJob(); })
        .catch(err => {
            alert(err.message);
            getJob();
            setIsLoading(false); 
        });
    }

    const deleteSkill = (skill) => {
        setIsLoading(true);
        deleteJobOfferSkill(skill.id)
        .then(() => { getJob(); })
        .catch(err => {
            alert(err.message);
            getJob();
            setIsLoading(false); 
        });
    }

    if (isLoading || !formInputs) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    return (
        <Card className="flex fColumn gap20 pad20 w80 mAuto">
            <Form title="Nuova Offerta di Lavoro" config={formInputs} defaultValues={dto} onSave={onSaveHandler} 
                onSaveItem={onSaveItem}
                onDeleteItem={onDeleteItem}
            />
        </Card>
    );
};

export default NewJobForm;