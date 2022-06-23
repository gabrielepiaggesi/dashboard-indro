import React, { useRef } from 'react';
import '../../global.css';
import Button from '../Button/Button';

const FreeTextOption = (props) => {
    const textAreaRef = useRef(null);

    const onSaveHandler = () => {
        props.onSave(textAreaRef.current.value);
    };

    return (
        <div className="flex fColumn gap10 fileRow">
            <textarea ref={textAreaRef} autoFocus defaultValue={props.text} className="br5" type="text" rows={10} />
            <Button onClick={onSaveHandler} secondary={true}>SALVA</Button>
        </div>
    );
};

export default FreeTextOption;