import React, { useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
// import classes from './Component.module.css';
import '../../global.css';
import { login } from '../../lib/api';
import Card from '../../UI/Card/Card';
import Form from '../../UI/Form/Form';

const loginConfig = [
    {
        "label": "Email",
        "type": "email",
        "key": "email",
        "tag": "input",
        "placeholder": "Email"
    },
    {
        "label": "Password",
        "type": "password",
        "key": "password",
        "tag": "input",
        "placeholder": "Password"
    },
];

const Login = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);

    if (isLoading) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    const onSubmitHandler = (formValue) => {
        setIsLoading(true);
        login(formValue)
        .then(data => props.onLogin({...formValue, ...data}))
        .catch(err => {
            setIsLoading(false); 
            setError(err.message);
        });
    };

    return (
        <Card className="flex fColumn mAuto pad20 w30">
            <Form title="Login" cta="ACCEDI" config={loginConfig} onSave={onSubmitHandler} />
            {error && <p style={{color: 'red'}}>{error}</p>}
        </Card>
    );
};

export default Login;