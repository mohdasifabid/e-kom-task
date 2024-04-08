import React, { useState, useEffect } from 'react';
import { useData } from '../context';
import useLocalStorage from './useLocalStorage';

const useSuccessMsg = () => {
    const { store, setData } = useData()
    const [userInfo, setUserInfo] = useLocalStorage("userInfo")

    const { isSuccessAlertAlive } = store

    useEffect(() => {
        if (userInfo?.token) {
            setData({ isSuccessAlertAlive: true });
            const timeout = setTimeout(() => {
                setData({ isSuccessAlertAlive: false });
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, []);

    return isSuccessAlertAlive;
};

export default useSuccessMsg;