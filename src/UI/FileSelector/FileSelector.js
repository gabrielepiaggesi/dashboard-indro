import React, { useRef, useState } from 'react';
import '../../global.css';
import { bytesToSizeString } from '../../utils';
import Button from '../Button/Button';
import classes from './FileSelector.module.css';

const FileSelector = (props) => {
    const fileInput = useRef(null);
    const [file, setFile] = useState(props.file);

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        setFile(file);
        props.onFileSelectSuccess(file);
        // if (file.size > 1024)
        //   props.onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        // else props.onFileSelectSuccess(file);
    };

    const onLoadFileHandler = () => {
        fileInput.current && fileInput.current.click();
    };

    return (
        <div className="fileRow">
            <input className="dN" type="file" ref={fileInput} onChange={handleFileInput} />
            <Button onClick={onLoadFileHandler} secondary={true} className="mr20">SCEGLI FILE</Button>
            <span>{file?.name || 'Nessun File Selezionato '}</span>
            {file && <span> - {bytesToSizeString(file.size)}</span>}
        </div>
    );
};

export default FileSelector;