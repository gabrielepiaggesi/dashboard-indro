import React, { useState } from 'react';
import classes from './Form.module.css';
import '../../global.css';
import Button from '../Button/Button';

const Form = (props) => {
    const [userInfos, setUserInfos] = useState(props.config);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnKey, setBtnKey] = useState(undefined);
    let lastInputValue = "";

    const onInputChange = (event) => {
        lastInputValue = event.target.value;
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let formValue = {};
        if (!userInfos) props.onSave(formValue);
        const infoKeys = userInfos.map(info => info.key);
        infoKeys && infoKeys.forEach((key, idx) => {
            formValue[key] = event.target.elements[key]?.value;
            if (userInfos[idx].tag === "ul") {
                formValue[key] = userInfos[idx]?.list?.map(e => e?.value);
            }
        });
        props.onSave(formValue);
        // TODO: call server to save formValue as new job offer
        // navigate('/', {replace: true});
    };

    const onAddElementHandler = (inputIdx) => {
        if (!userInfos[inputIdx].list) {
            userInfos[inputIdx].list = [{value: "", saved: false}];
            setBtnKey(userInfos[inputIdx].key+0);
        } else {
            userInfos[inputIdx].list.push({value: "", saved: false});
            setBtnKey(userInfos[inputIdx].key+(userInfos[inputIdx].list.length-1));
        }
        setUserInfos(prevState => ([...userInfos]));
        setBtnDisabled(true);
    };

    const onSaveElementHandler = (inputIdx, elemIdx) => {
        if (userInfos[inputIdx].list.length) {
            userInfos[inputIdx].list[elemIdx].value = lastInputValue || userInfos[inputIdx].list[elemIdx].value;
            userInfos[inputIdx].list[elemIdx].saved = true;
            setUserInfos(prevState => ([...userInfos]));
        }
        setBtnDisabled(undefined);
        setBtnDisabled(false);
    };

    const onEditElementHandler = (inputIdx, elemIdx) => {
        if (userInfos[inputIdx].list.length) {
            userInfos[inputIdx].list[elemIdx].saved = false;
            setUserInfos(prevState => ([...userInfos]));
        }
        setBtnKey(userInfos[inputIdx].key+(elemIdx));
        setBtnDisabled(true);
    };

    const onRemoveElementHandler = (inputIdx, elemIdx) => {
        if (userInfos[inputIdx].list.length) {
            userInfos[inputIdx].list.splice(elemIdx, 1);
        }
        setUserInfos(prevState => ([...userInfos]));
        setBtnDisabled(undefined);
        setBtnDisabled(false);
    };

    return (
        <>
            <p className={classes.title}>{props.title}</p>
            <form className={`${classes.form} flex fColumn gap20`} onSubmit={onSubmitHandler}>
                {userInfos.map((info, infoIdx) => 
                    <div key={info.key} className="flex fColumn gap10">
                        <label>{info.label}</label>
                        {(info.tag === "input") && 
                            <input 
                                className="pad15 br5 boxSha" 
                                type={info.type} 
                                name={info.key} 
                                placeholder={info.placeholder}
                            />
                        }
                        {(info.tag === "select") && 
                            <select className="pad15 br5 f1 boxSha" name={info.key}>
                                {info.options && info.options.map((opt, idx) => 
                                    <option key={idx+opt} value={opt}>{opt}</option>
                                )}
                                {!info.options && info.linkUl >= 0 && userInfos[info.linkUl]?.list?.map((opt, idx) => 
                                    <option key={idx+opt.value} value={opt.value}>{opt.value}</option>
                                )}
                            </select>
                        }
                        {(info.tag === "textarea") && 
                            <textarea className="pad15 br5 boxSha" type={info.type} name={info.key} placeholder={info.placeholder} />
                        }
                        {(info.tag === "ul") && 
                            (
                                <div className="flex fColumn f1 gap10">
                                    {info?.list?.map((elem, elemIdx) => 
                                        <div key={info.key+elemIdx+elem.value} className="flex fRow aCenter gap10">
                                            <input 
                                                disabled={elem.saved}
                                                key={"input"+info.key+elemIdx} 
                                                className="pad15 br5 f1 boxSha" 
                                                type={info.type} 
                                                name={info.key+"_"+elemIdx} 
                                                defaultValue={elem.value} 
                                                onChange={onInputChange}
                                            />
                                            {!elem.saved && 
                                                <>
                                                <Button disabled={btnDisabled && btnKey !== info.key+elemIdx} outline={false} onClick={() => onSaveElementHandler(infoIdx, elemIdx)}>salva</Button>
                                                <Button disabled={btnDisabled && btnKey !== info.key+elemIdx} outline={true} onClick={() => onRemoveElementHandler(infoIdx, elemIdx)}>elimina</Button>
                                                </>
                                            }
                                            {elem.saved && 
                                                <Button disabled={btnDisabled && btnKey !== info.key+elemIdx} outline={true} onClick={() => onEditElementHandler(infoIdx, elemIdx)}>modifica</Button>
                                            }
                                        </div>
                                    )}
                                    <Button disabled={btnDisabled} outline={true} onClick={() => onAddElementHandler(infoIdx)}>+ aggiungi</Button>
                                </div>
                            )
                        }
                    </div>
                )}
                {props.children}
                <Button type="submit" className="fBold">{props.cta || 'SALVA'}</Button>
            </form>
        </>
    );
};

export default Form;