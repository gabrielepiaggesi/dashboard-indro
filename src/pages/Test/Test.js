import React, { useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import '../../global.css';
import { loadJSON } from '../../utils';
import { useNavigate } from 'react-router-dom';
import Form from '../../UI/Form/Form';

const Test = () => {
    const navigate = useNavigate();
    const [userInfos, setUserInfos] = useState(undefined);

    useEffect(() => {
        loadJSON('../testConfig.json')
        .then(sample => {
            setUserInfos(sample);
        });
    }, []);

    if (!userInfos) return (<p>Loading...</p>);

    const onSaveHandler = (event) => {
        navigate('/', {replace: true});
    };

    return (
        <Card className="flex fColumn gap20 pad20 w80 mAuto">
            <Form title="Configura la Domanda" config={userInfos} onSave={onSaveHandler} />
        </Card>
    );
};

export default Test;