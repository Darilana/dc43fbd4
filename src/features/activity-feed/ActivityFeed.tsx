import React, { useState } from 'react';
import { makeStyles, Tab, Tabs } from '@material-ui/core';

import { ActivityList } from './ActivityList';
import { TabPanel } from '../../components/TabPanel';
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

    const { activities, errorMessage, isErrorShown, setIsErrorShown } =
        useActivityContext();

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (
        _event: React.ChangeEvent<object>,
        newValue: number
    ) => setTabValue(newValue);

    const archivedCalls = activities.filter(({ is_archived }) => is_archived);
    const notArchivedCalls = activities.filter(
        ({ is_archived }) => !is_archived
    );

    return (
        <div className={classes.feedContainer}>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
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
            <TabPanel value={tabValue} index={0}>
                <ActivityListButtons
                    calls={notArchivedCalls}
                    isActiveCallsTab={true}
                />
                <ActivityList calls={notArchivedCalls} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <ActivityListButtons
                    calls={archivedCalls}
                    isActiveCallsTab={false}
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
