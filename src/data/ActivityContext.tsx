import React, { createContext, useContext, useState, useEffect } from 'react';
import { getActivities } from '../api/activities';
import { ActivityCall } from '../types/activity';
import axios from 'axios';

interface ActivityContextProviderState {
    activities: ActivityCall[];
    setActivities: React.Dispatch<React.SetStateAction<ActivityCall[]>>;
    isErrorShown: boolean;
    setIsErrorShown: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    isActivitiesListLoading: boolean;
    setIsActivitiesListLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
    activities: [],
    setActivities: () => {},
    isErrorShown: false,
    setIsErrorShown: () => {},
    errorMessage: '',
    setErrorMessage: () => {},
    isActivitiesListLoading: false,
    setIsActivitiesListLoading: () => {},
};

const ActivityContext =
    createContext<ActivityContextProviderState>(initialState);

export const ActivityContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [activities, setActivities] = useState<ActivityCall[]>([]);
    const [isActivitiesListLoading, setIsActivitiesListLoading] =
        useState(false);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        setIsActivitiesListLoading(true);

        getActivities(controller.signal)
            .then((result) => {
                setActivities(result);
                setIsActivitiesListLoading(false);
            })
            .catch((e) => {
                if (!axios.isCancel(e)) {
                    setIsErrorShown(true);
                    setErrorMessage(e.message);
                    setIsActivitiesListLoading(false);
                }
            });

        return () => controller.abort();
    }, []);

    return (
        <ActivityContext.Provider
            value={{
                activities,
                setActivities,
                isErrorShown,
                setIsErrorShown,
                errorMessage,
                setErrorMessage,
                isActivitiesListLoading,
                setIsActivitiesListLoading,
            }}
        >
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivityContext = () => useContext(ActivityContext);
