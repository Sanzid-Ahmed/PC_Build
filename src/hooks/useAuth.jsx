/* eslint-disable no-unused-vars */
import React from 'react';
import { use } from 'react';
import { AuthContext } from '../contexts/AuthContect/AuthContext';

const useAuth = () => {

    const authInfo = use(AuthContext);
    return authInfo;
};

export default useAuth;