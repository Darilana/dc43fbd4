import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loaderContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

export const Loader: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.loaderContainer}>
            <CircularProgress />
        </div>
    );
};
