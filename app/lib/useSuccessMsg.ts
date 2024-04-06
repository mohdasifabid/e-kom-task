import React, { useState, useEffect } from 'react';
import { useData } from '../context';

const useSuccessMsg = () => {
    const { store, setData } = useData()
    const { isAuthenticated, isSuccessAlertAlive } = store

    useEffect(() => {
        if (isAuthenticated) {
            setData({ ...store, isSuccessAlertAlive: true });
            const timeout = setTimeout(() => {
                setData({ ...store, isSuccessAlertAlive: false });
            }, 5000);

            return () => clearTimeout(timeout);
        }
    },[]);

    return isSuccessAlertAlive;
};

export default useSuccessMsg;