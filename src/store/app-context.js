import React, { useEffect, useState } from 'react';
import { setToken } from '../lib/api';

const AppContext = React.createContext({
    isLoggedIn: false,
    userDetails: undefined,
    token: undefined,
    onLogout: () => {},
    setCompany: () => {},
    onLogin: (email, token, userId) => {}
});

export const AppContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(undefined);
    const [userToken, setUserToken] = useState(undefined);
    const [companyId, setCompanyId] = useState(undefined);

    useEffect(() => {
        const userSaved = localStorage.getItem('userDetails');
        const userToken = localStorage.getItem('userToken');
        if (userSaved && userToken) {
            setUserDetails(JSON.parse(userSaved));
            setIsLoggedIn(true);
            setToken(userToken);
            setUserToken(userToken);
        }
      }, []); // this runs only after the component and only if the dependencies are changed, but by passing an empty array of deps, deps will never change so this will run just when the component is called the first time

    const logoutHandler = () => {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
    };

    const loginHandler = (userDetails) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        delete userDetails.password;
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('userToken', userDetails.token);
        setUserDetails(userDetails);
        setIsLoggedIn(true);
        setToken(userDetails.token);
        setUserToken(userDetails.token);
    };

    const setCompany = (id) => setCompanyId(id);

    return (
        <AppContext.Provider value={{ 
                isLoggedIn: isLoggedIn, 
                userDetails: userDetails,
                token: userToken,
                companyId,
                setCompany,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContext;