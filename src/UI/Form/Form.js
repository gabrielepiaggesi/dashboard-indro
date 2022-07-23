import React, { useEffect, useState } from 'react';
import classes from './Form.module.css';
import '../../global.css';
import Button from '../Button/Button';

const transformInputs = (inputs, values) => {
    return values ? [...inputs].map(elem => {
        let i = {...elem};
        if (i.tag !== 'ul') {
            i.value = values[i.key] ? values[i.key] : undefined;
        }
        if (i.tag === 'ul') {
            i.list = values[i.key] ? values[i.key] : [];
        }
        return i;
    }): [...inputs].map(elem => ({...elem}));
}

const Form = (props) => {
    const [userInfos, setUserInfos] = useState(transformInputs(props.config, props.defaultValues));
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnKey, setBtnKey] = useState(undefined);
    const [fileUrls, setFileUrls] = useState([]);
    let lastInputValue = "";

    useEffect(() => {
        return () => fileUrls.forEach(url => { console.log('REMOVING ', url);  URL.revokeObjectURL(url); })
    }, [])

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
            if (userInfos[idx].type === "checkbox") {
                formValue[key] = event.target.elements[key]?.checked ? 1 : 0;
            }
            if (userInfos[idx].type === 'number') {
                formValue[key] = +formValue[key];
            }
            if (userInfos[idx].type === 'file' && event.target.elements[key]?.files && event.target.elements[key]?.files.length) {
                formValue[key] = event.target.elements[key]?.files[0];
            }
            if (userInfos[idx].type === 'file' && userInfos[idx].value === 'cancel') {
                formValue[key] = 'cancel';
            }
        });
        props.onSave(formValue);
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

            if (props.onSaveItem) {
                props.onSaveItem(userInfos[inputIdx].key, userInfos[inputIdx].list[elemIdx], elemIdx+1);
            }
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
            if (props.onDeleteItem) {
                props.onDeleteItem(userInfos[inputIdx].key, userInfos[inputIdx].list[elemIdx]);
            }
            userInfos[inputIdx].list.splice(elemIdx, 1);
        }
        setUserInfos(prevState => ([...userInfos]));
        setBtnDisabled(undefined);
        setBtnDisabled(false);
    };

    const onFileChangeHandler = (event, info, infoIdx) => {
        const objectUrl = URL.createObjectURL(event.target.files[0]);
        setFileUrls(prevState => [...prevState, objectUrl]);
        info.value = objectUrl;
        userInfos[infoIdx].value = objectUrl;
        setUserInfos(prevState => ([...userInfos]));
        console.log(userInfos[infoIdx]);
    }

    const onFileRemoveHandler = (infoIdx) => {
        userInfos[infoIdx].value = 'cancel';
        setUserInfos(prevState => ([...userInfos]));
    }

    return (
        <>
            {props.title && <p className={classes.title}>{props.title}</p>}
            <form className={`${classes.form} flex fColumn gap20`} onSubmit={onSubmitHandler}>
                {userInfos.map((info, infoIdx) => 

                    (info.type === "checkbox") ? 
                    <div key={info.key} className="flex fRow aCenter gap15">
                        <input 
                                className={`pad15 br5 brC ${classes.checkInput}`}
                                type={info.type} 
                                name={info.key} 
                                placeholder={info.placeholder}
                                defaultValue={info.value || null}
                                defaultChecked={info.value || false}
                            />
                        <label>{info.label}</label>
                    </div>

                    :

                    <div key={info.key} className="flex fColumn gap10">
                        <label>{info.label}</label>
                        {(info.tag === "input") && 
                        <>
                            {info.type === 'file' && info.value && info.value !== 'cancel' && <img src={info.value} width="200" alt={info.value} />}
                            {info.type === 'file' && info.value && info.value !== 'cancel' && <label className={`pad15 br5 ${classes.fakeButton}`} htmlFor={info.key}>cambia immagine</label>}
                            {info.type === 'file' && info.value && info.value !== 'cancel' && <label className={`pad15 br5 ${classes.fakeButton}`} onClick={() => onFileRemoveHandler(infoIdx)}>imposta questo test senza una immagine</label>}
                            <input 
                                className="pad15 br5 brC" 
                                type={info.type} 
                                name={info.key} 
                                id={info.key}
                                style={(info.type === 'file' && info.value) ? {visibility: 'hidden'} : {} }
                                placeholder={info.placeholder}
                                defaultValue={info.type !== 'file' ? (info.value || null) : null}
                                onChange={(e) => info.type === 'file' && onFileChangeHandler(e, info, infoIdx)}
                            />
                        </>
                        }
                        {(info.tag === "select") && 
                            <select className="pad15 br5 f1 brC" name={info.key} defaultValue={info.value || null}>
                                {info.options && info.options.map((opt, idx) => 
                                    <option key={info.key + '-' + opt} id={idx+opt} value={opt}>{opt}</option>
                                )}
                                {!info.options && info.linkUl >= 0 && 
                                userInfos[info.linkUl]?.list?.length && 
                                userInfos[info.linkUl]?.list?.map((opt, idx) => 
                                    <option key={info.key + '-' + opt.value} id={idx+opt.value} value={opt.value}>{opt.value}</option>
                                )}
                            </select>
                        }
                        {(info.tag === "textarea") && 
                            <textarea className="pad15 br5 brC" defaultValue={info.value || null} type={info.type} name={info.key} placeholder={info.placeholder} />
                        }
                        {(info.tag === "ul") && 
                            (
                                <div className="flex fColumn f1 gap10">
                                    {info?.list?.map((elem, elemIdx) => 
                                        <div key={info.key+elemIdx+elem.value} className="flex fRow aCenter gap10">
                                            <input 
                                                disabled={elem.saved}
                                                key={elem.id || 'input'+info.key+elemIdx} 
                                                className="pad15 br5 f1 brC" 
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