import React, { useState } from 'react';
import { makeStyles, Tab, Tabs } from '@material-ui/core';

import { ActivityList } from './ActivityList';
import { TabPanel } from '../../components/TabPanel';
import { getActivities, resetCalls, updateCall } from '../../api/activities';
import { ActivityCall } from '../../types/call';
import { ErrorSnackbar } from '../../components/ErrorSnackbar';
import { useActivityContext } from '../../data/ActivityContext';
import { ActivityListButtons } from './ActivityListButtons';

const useStyles = makeStyles({
    tab: {
        flexGrow: 1,
    },
    feedContainer: {
        overflowY: 'auto',
    },
});

export const ActivityFeed: React.FC = () => {
    const classes = useStyles();

    const {
        activities,
        setIsActivitiesListLoading,
        setActivities,
        errorMessage,
        setErrorMessage,
        isErrorShown,
        setIsErrorShown,
    } = useActivityContext();

    const [value, setValue] = useState(0);

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const archivedCalls = activities.filter((activity) => activity.is_archived);
    const notArchivedCalls = activities.filter(
        (activity) => !activity.is_archived
    );

    const handleUpdateCalls = (callsToUpdate: ActivityCall[]) => {
        const requests = callsToUpdate.map(({ id, is_archived }) =>
            updateCall(id, {
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

    const resetCallsState = () => {
        setIsActivitiesListLoading(true);
        resetCalls()
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
        <div className={classes.feedContainer}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="activity tabs"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab
                    label="Active calls"
                    aria-controls="tabpanel-0"
                    className={classes.tab}
                />
                <Tab
                    label="Archived calls"
                    aria-controls="tabpanel-1"
                    className={classes.tab}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <ActivityListButtons
                    isActiveCallsTab={true}
                    isCallsListEmpty={notArchivedCalls.length === 0}
                    handleUpdateCalls={() =>
                        handleUpdateCalls(notArchivedCalls)
                    }
                    handleResetCalls={resetCallsState}
                />
                <ActivityList calls={notArchivedCalls} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ActivityListButtons
                    isActiveCallsTab={false}
                    isCallsListEmpty={archivedCalls.length === 0}
                    handleUpdateCalls={() => handleUpdateCalls(archivedCalls)}
                    handleResetCalls={resetCallsState}
                />
                <ActivityList calls={archivedCalls} />
            </TabPanel>
            {isErrorShown && (
                <ErrorSnackbar
                    message={errorMessage}
                    handleClose={() => setIsErrorShown(false)}
                />
            )}
        </div>
    );
};
