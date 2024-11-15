import React, { useEffect, useState } from 'react';
import { ActivityCall } from '../../types/call';
import {
    Typography,
    Box,
    makeStyles,
    Button,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    Paper,
} from '@material-ui/core';
import { CallDirection, CallType } from '../../constants/call';
import { convertSecondsToDuration } from '../../utils/convertSecondsToDuration';
import { getActivities, getActivity, updateCall } from '../../api/activities';
import { useActivityContext } from '../../data/ActivityContext';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { Loader } from '../../components/Loader';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(3),
        alignSelf: 'center',
        width: 'fit-content',
    },
}));

interface CallDetailsProps {
    callId: string;
}

export const CallDetails: React.FC<CallDetailsProps> = ({ callId }) => {
    const {
        activities,
        setIsActivitiesListLoading,
        setActivities,
        errorMessage,
        setErrorMessage,
        isErrorShown,
        setIsErrorShown,
    } = useActivityContext();

    const classes = useStyles();

    const [isUpdateCallLoading, setIsUpdateCallLoading] = useState(false);
    const [call, setCall] = useState<ActivityCall | null>(null);
    const [isCallLoading, setIsCallLoading] = useState(false);

    console.log({ isCallLoading });

    useEffect(() => {
        const controller = new AbortController();

        setIsCallLoading(true);

        getActivity(callId, controller.signal)
            .then((result) => {
                setCall(result);
                setIsCallLoading(false);
            })
            .catch((e) => {
                if (!axios.isCancel(e)) {
                    setIsCallLoading(false);
                    setIsErrorShown(true);
                    setErrorMessage(e.message);
                }
            });

        return () => controller.abort();
    }, []);

    if (isCallLoading) {
        return <Loader />;
    }

    if (!call) {
        return (
            <div className={classes.detailsContainer}>
                <Typography align="center" variant="overline">
                    Unable to get the call data
                </Typography>
            </div>
        );
    }

    const { id, direction, to, via, duration, is_archived, call_type } = call;

    const handleUpdateCall = () => {
        setIsUpdateCallLoading(true);

        updateCall(id, { is_archived: !is_archived })
            .then(() => {
                setIsUpdateCallLoading(false);
                setIsActivitiesListLoading(true);
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

    const rows = [
        { name: 'Duration:', data: convertSecondsToDuration(duration) },
        { name: 'Called to:', data: to },
        { name: 'Called via:', data: via },
    ];

    const callDirectionAndType =
        call_type === CallType.Missed
            ? 'Missed call'
            : direction === CallDirection.Inbound
              ? `Incoming call (${call_type})`
              : `Outgoing call  (${call_type})`;

    if (isUpdateCallLoading) {
        return <Loader />;
    }

    return (
        <div className={classes.detailsContainer}>
            <Typography align="center" variant="overline">
                {callDirectionAndType}
            </Typography>
            <TableContainer>
                <Table aria-label="call details table">
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.data}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </TableContainer>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleUpdateCall}
                startIcon={is_archived ? <UnarchiveIcon /> : <ArchiveIcon />}
            >
                {is_archived ? 'Unarchive' : 'Archive'}
            </Button>
        </div>
    );
};
