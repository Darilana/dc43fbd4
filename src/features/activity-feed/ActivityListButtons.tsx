import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useActivityContext } from '../../data/ActivityContext';
import { ActivityCall } from '../../types/activity';
import {
    getActivities,
    resetActivities,
    updateActivity,
} from '../../api/activities';

const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    },
}));

interface ActivityListButtonsprops {
    calls: ActivityCall[];
    isActiveCallsTab: boolean;
}

export const ActivityListButtons: React.FC<ActivityListButtonsprops> = ({
    calls,
    isActiveCallsTab,
}) => {
    const classes = useStyles();
    const {
        isActivitiesListLoading,
        setIsActivitiesListLoading,
        setActivities,
        setIsErrorShown,
        setErrorMessage,
    } = useActivityContext();

    const isCallsListEmpty = calls.length === 0;
    const updateButtonTitle = isActiveCallsTab
        ? 'Archive all calls'
        : 'Unarchive all calls';
    const updateButtonTitleWithEmptyList = isActiveCallsTab
        ? 'Nothing to archive'
        : 'Nothing to unarchive';

    const handleUpdateCalls = () => {
        const requests = calls.map(({ id, is_archived }) =>
            updateActivity(id, {
                is_archived: !is_archived,
            })
        );

        setIsActivitiesListLoading(true);

        Promise.all(requests)
            .then(() => {
                return getActivities();
            })
            .then((result) => {
                setActivities(result);
            })
            .catch((e) => {
                setIsErrorShown(true);
                setErrorMessage(e.message);
            })
            .finally(() => setIsActivitiesListLoading(false));
    };

    const resetCalls = () => {
        setIsActivitiesListLoading(true);

        resetActivities()
            .then(() => {
                return getActivities();
            })
            .then((result) => {
                setActivities(result);
            })
            .catch((e) => {
                setIsErrorShown(true);
                setErrorMessage(e.message);
            })
            .finally(() => setIsActivitiesListLoading(false));
    };

    return (
        <div className={classes.buttonsContainer}>
            <Button
                disabled={isActivitiesListLoading || isCallsListEmpty}
                variant="contained"
                color="primary"
                onClick={handleUpdateCalls}
            >
                {isCallsListEmpty && !isActivitiesListLoading
                    ? updateButtonTitleWithEmptyList
                    : updateButtonTitle}
            </Button>
            <Button
                disabled={isActivitiesListLoading}
                variant="contained"
                color="secondary"
                onClick={resetCalls}
            >
                Reset all calls
            </Button>
        </div>
    );
};
