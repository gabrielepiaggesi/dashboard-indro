import React from 'react';
// import classes from './Component.module.css';
import '../../global.css';
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
    return (
        <Card className="flex fColumn mAuto pad20 w30">
            <Form title="Login" cta="ACCEDI" config={loginConfig} onSave={props.onLogin} />
        </Card>
    );
};

export default Login;