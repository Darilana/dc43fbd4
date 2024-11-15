import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useActivityContext } from '../../data/ActivityContext';

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
    isActiveCallsTab: boolean;
    isCallsListEmpty: boolean;
    handleUpdateCalls: () => void;
    handleResetCalls: () => void;
}

export const ActivityListButtons: React.FC<ActivityListButtonsprops> = ({
    isActiveCallsTab,
    isCallsListEmpty,
    handleUpdateCalls,
    handleResetCalls,
}) => {
    const classes = useStyles();
    const { isActivitiesListLoading } = useActivityContext();
    const updateButtonTitle = isActiveCallsTab
        ? 'Archive all calls'
        : 'Unarchive all calls';
    const updateButtonTitleWithEmptyList = isActiveCallsTab
        ? 'Nothing to archive'
        : 'Nothing to unarchive';

    return (
        <div className={classes.buttonsContainer}>
            <Button
                disabled={isActivitiesListLoading || isCallsListEmpty}
                variant="contained"
                color="primary"
                onClick={handleUpdateCalls}
            >
                {isCallsListEmpty
                    ? updateButtonTitleWithEmptyList
                    : updateButtonTitle}
            </Button>
            <Button
                disabled={isActivitiesListLoading}
                variant="contained"
                color="secondary"
                onClick={handleResetCalls}
            >
                Reset all calls
            </Button>
        </div>
    );
};
