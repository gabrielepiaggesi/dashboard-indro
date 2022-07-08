import React, { useContext, useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import '../../global.css';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../UI/Form/Form';
import { multipleType, testConfig } from './testConfig';
import classes from './Test.module.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { addQuizTest, createNewTestOption, createNewTestText, getQuizTest, removeTestOption, removeTestText, updateTestOption, updateTestText } from '../../lib/api';

const Test = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formInputs, setFormInputs] = useState([]);
    const [testType, setTestType] = useState(undefined);
    const [formValue, setFormValue] = useState(undefined);
    const [testData, setTestData] = useState(undefined);

    useEffect(() => getTest(), []);

    if (isLoading) return (<div className="flex fCenter"><LoadingSpinner /></div>);

    const onSelectChangeHandler = (event) => {
        const type = event.target.value;
        if (type === 'multiple') setFormInputs(prevState => [...testConfig, ...multipleType]);
        if (type !== 'multiple') setFormInputs(prevState => testConfig);
        setTestType(type);
    }

    const getTest = () => {
        const testId = params.testId;
        if (testId !== 'new') {
            setIsLoading(true);
            getQuizTest(testId)
            .then((data) => { 
                setTestData(data);
                const type = data.test.type.toLowerCase();
                if (type === 'multiple') setFormInputs(prevState => [...testConfig, ...multipleType]);
                if (type !== 'multiple') setFormInputs(prevState => testConfig);
                setTestType(type);
                setFormValue(prevState => transformToFormValue(data)); 
                setIsLoading(false); 
            })
            .catch(err => {
                setIsLoading(false); 
            });
        } else {
            setTestType('multiple');
            setFormInputs([...testConfig, ...multipleType]);
        }
    }

    const transformToFormValue = (data) => {
        const formValue = data.test;
        formValue.options = data.options.length ? data.options.map(o => ({value: o.option_text, saved: true, id: o.id})) : [];
        formValue.texts = data.texts.length ? data.texts.map(o => ({value: o.text, saved: true, id: o.id})): [];
        formValue.right_option = data.options.length ? data.options.filter(o => o.is_correct)[0].option_text : undefined;
        setFormValue(formValue);
    };

    const onSaveHandler = (newFormValue) => {
        console.log(newFormValue);
        const data = { 
            test: getTestGeneralConfig(newFormValue),
            options: getTestOptions(newFormValue),
            texts: getTestTexts(newFormValue),
            files: [{file: newFormValue.file, position_order: 0}]
        };
        addQuizTest(data, params.testId)
        .then(() => { setFormValue(undefined); navigate(-1, {replace: true}); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
            navigate(-1, {replace: true});
        });
    };

    const getTestGeneralConfig = (data) => {
        return {
            quiz_id: params.quizId,
            question: data.question,
            minutes: 0,
            type: testType.toUpperCase(),
            points: testType === 'multiple' ? data.points : 0,
            position_order: params.positionOrder,
            difficulty_level: data.difficulty_level,
            new_right_option: testData && testData.options.length ? testData.options.filter(o => o.option_text === data.right_option)[0].id : 0,
            old_right_option: testData && testData.options.length ? testData.options.filter(o => !!o.is_correct)[0].id : 0,
        }
    };

    const getTestOptions = (data) => {
        if (testType !== 'multiple' || !data.options) return [];
        const opts = data.options;
        return opts.map((opt, idx) => (
            {
                option_text: opt,
                is_correct: opt === data.right_option ? 1 : 0,
                points: opt === data.right_option ? data.points : 0,
                position_order: idx + 1
            }
        ));
    };

    const getTestTexts = (data) => {
        if (!data.texts) return [];
        const texts = data.texts;
        return texts.map((text, idx) => (
            {
                text,
                position_order: idx + 1
            }
        ));
    };

    const onSaveItem = (key, item, idx) => {
        if (params.testId === 'new') return;
        if (item.id) {
            if (key === 'options') updateOption(item);
            if (key === 'texts') updateText(item);
        } else {
            if (key === 'options') saveOption(item, idx);
            if (key === 'texts') saveText(item, idx);
        }
    }

    const updateOption = (item) => {
        const data = { 
            option_text: item.value
        };
        setFormValue(data);
        updateTestOption(data, item.id)
        .then(() => { setFormValue(undefined); getTest(); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    const updateText = (item) => {
        const data = { 
            text: item.value
        };
        setFormValue(data);
        updateTestText(data, item.id)
        .then(() => { setFormValue(undefined); getTest(); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    const saveOption = (item, idx) => {
        const data = { 
            option_text: item.value,
            position_order: idx,
            is_correct: 0,
            points: 0
        };
        setFormValue(data);
        createNewTestOption(data, params.testId)
        .then(() => { setFormValue(undefined); getTest(); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    const saveText = (item, idx) => {
        const data = { 
            text: item.value,
            position_order: idx
        };
        setFormValue(data);
        createNewTestText(data, params.testId)
        .then(() => { setFormValue(undefined); getTest(); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    const onDeleteItem = (key, item) => {
        if (params.testId === 'new') return;
        if (item.id) {
            if (key === 'options') deleteOption(item);
            if (key === 'texts') deleteText(item);
        }
    }

    const deleteOption = (item) => {
        removeTestOption(item.id)
        .then(() => { setFormValue(undefined); getTest(); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    const deleteText = (item) => {
        removeTestText(item.id)
        .then(() => { setFormValue(undefined); getTest(); })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message);
        });
    }

    return (
        <Card className="flex fColumn gap20 pad20 w80 mAuto">
            <p className={classes.title}>Configura la Domanda</p>
            <div className="flex fColumn gap10">
                <label>Tipologia Test</label>
                <select className="pad15 br5 f1 boxSha" onChange={onSelectChangeHandler} defaultValue={testType}>
                    <option key="multiple" value="multiple">Risposta Multipla</option>
                    <option key="free_text" value="free_text">Testo Libero</option>
                    <option key="file" value="file">File</option>
                </select>
                </div>
            <Form 
                key={testType+'-'+params.testId+'-'+params.positionOrder} 
                config={formInputs} 
                defaultValues={formValue} 
                onSave={onSaveHandler} 
                onSaveItem={onSaveItem}
                onDeleteItem={onDeleteItem}
            />
        </Card>
    );
};

export default Test;