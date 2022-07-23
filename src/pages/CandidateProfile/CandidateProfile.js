import React, { useEffect, useState } from 'react';
import classes from './CandidateProfile.module.css';
import '../../global.css';
import Card from '../../UI/Card/Card';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getCandidateData, getUserTestsImages } from '../../lib/api';
import { useParams } from 'react-router-dom';
import { candidateFormConfig } from '../../components/CandidateForm/candidateFormConfig';

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const CandidateProfile = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(undefined);
    const [userTestImages, setUserTestImage] = useState(undefined);
    const [userImage, setUserImage] = useState(undefined);
    const [userFiles, setUserFiles] = useState(undefined);
    const [basicUserData, setBasicUserData] = useState(undefined);
    const [iFrameSrc, setIFrameSrc] = useState(undefined);
    const params = useParams();

    useEffect(() => getUserData(), []);

    const getUserData = () => {
        setIsLoading(true);
        Promise.all([
            getUserTestsImages(params.userId, params.jobOfferId),
            getCandidateData(params.userId, params.jobOfferId)
        ])
        .then((data) => {
            setUserTestImage(data[0])
            processUserData(data[1]);
            setIsLoading(false); 
        })
        .catch(err => {
            setIsLoading(false); 
            alert(err.message)
        });
    }

    const processUserData = (data) => {
        const userPhoto = data.filter(d => d.option_key === 'photo');
        const basicData = data.filter(d => ['name', 'lastname', 'email', 'phoneNumber', 'birthdate'].includes(d.option_key)).map(d => ({...d, label: candidateFormConfig.find(c => c.key === d.option_key).text}));
        const birthdate = basicData.find(b => b.option_key === 'birthdate');
        if (birthdate) {
            basicData.push(
                {
                    label: 'Eta',
                    number_value: getAge(birthdate.string_value)
                }
            )
        }
        const dataFiles = data.filter(d => ['FILE'].includes(d.type) && !['photo'].includes(d.option_key)).map(d => ({...d, label: candidateFormConfig.find(c => c.key === d.option_key).text}));
        const userData = data.filter(d => !['name', 'lastname', 'email', 'phoneNumber'].includes(d.option_key) && !['FILE'].includes(d.type)).map(d => ({...d, label: candidateFormConfig.find(c => c.key === d.option_key).text}));
        setUserData(userData);
        setBasicUserData(basicData);
        if (dataFiles && dataFiles.length) setIFrameSrc(dataFiles[0].string_value);
        setUserFiles(dataFiles);
        if (userPhoto.length) setUserImage(userPhoto[0].string_value);
    }

    const onFileClickHandler = (file) => {
        console.log(file);
        setIFrameSrc(file.string_value);
    }

    if (isLoading || !userData) {
        return (<div className="flex fCenter"><LoadingSpinner /></div>);
    }

    return (
        <div className={`${classes.CandidateProfile} flex fColumn w100 mAuto gap20`}>
            <Card className="pad20 w100 hFCon grid n2Col">
                <div className="flex fColumn gap40">
                    <div className={`q150 divImage br5 ${classes.profilePic}`} style={{backgroundImage: `url(${userImage || '../../profilePic.jpeg'})`}}></div>
                    <div className="flex fColumn gap5">
                        {basicUserData.map(bD => <p key={bD.option_key} className="pL"><strong>{bD.label}:</strong> {bD.string_value || bD.number_value}</p>)}
                    </div>
                    <div className="flex fColumn gap5">
                        {userData.map(bD => <p key={bD.option_key} className="pL"><strong>{bD.label}:</strong> {bD.type !== 'BOOLEAN' ? bD.string_value || bD.number_value : bD.number_value === 1 ? 'SI' : 'NO'}</p>)}
                    </div>
                </div>
                <div>
                    {userFiles && userFiles.length && <div className={classes.iFrameBox}>
                        <div className='flex fRow aCenter jBet pad10'>
                            {userFiles.map(bD =>  <span className="pM cP" key={bD.option_key} onClick={() => onFileClickHandler(bD)}>   {iFrameSrc === bD.string_value ? <strong>{bD.label}</strong> : <span>{bD.label}</span>}</span>)}
                            <a href={iFrameSrc || userFiles[0].string_value} rel="noreferrer" target="_blank">SCHERMO INTERO</a>
                        </div>
                        <iframe className={classes.iFrame} title={iFrameSrc || userFiles[0].string_value} src={iFrameSrc || userFiles[0].string_value}></iframe>
                    </div>}
                </div>
            </Card>
            {!!userTestImages && userTestImages.length && <Card className="pad20 w100 flex fRow aCenter fWrap gap20">
                {userTestImages.map(image =>
                    <img className='br5' width={200} height={150} key={image.id} src={image.image_url} alt={image.id}></img>
                )}
            </Card>}
        </div>
    );
};

export default CandidateProfile;