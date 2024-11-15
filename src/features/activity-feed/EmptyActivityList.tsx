import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
    },
});

export const EmptyActivityList: React.FC = () => {
    const classes = useStyles();

    return (
        <section className={classes.container}>
            <Typography>No calls to display</Typography>
        </section>
    );
};
