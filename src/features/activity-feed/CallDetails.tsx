import React, { useEffect, useState } from 'react';
import { ActivityCall } from '../../types/activity';
import {
    Typography,
    makeStyles,
    Button,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import { CallDirection, CallType } from '../../constants/activity';
import { convertSecondsToDuration } from '../../utils/convertSecondsToDuration';
import {
    getActivities,
    getActivity,
    updateActivity,
} from '../../api/activities';
import { useActivityContext } from '../../data/ActivityContext';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { Loader } from '../../components/Loader';
import axios from 'axios';
import { formatDate } from '../../utils/formatDate';

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
        setIsActivitiesListLoading,
        setActivities,
        setErrorMessage,
        setIsErrorShown,
    } = useActivityContext();

    const classes = useStyles();

    const [call, setCall] = useState<ActivityCall | null>(null);
    const [isCallLoading, setIsCallLoading] = useState(false);

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

    const handleUpdateCall = () => {
        setIsCallLoading(true);

        updateActivity(id, { is_archived: !is_archived })
            .then(() => {
                setIsCallLoading(false);
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

    const {
        id,
        direction,
        to,
        via,
        duration,
        is_archived,
        call_type,
        created_at,
        from,
    } = call;

    const rows = [
        { name: 'Duration:', data: convertSecondsToDuration(duration) },
        {
            name: 'Date:',
            data: formatDate(created_at),
        },
        { name: 'Called to:', data: to },
        { name: 'Called from:', data: from },
        { name: 'Called via:', data: via },
    ];

    const callDirectionAndType =
        call_type === CallType.Missed
            ? 'Missed call'
            : direction === CallDirection.Inbound
              ? `Incoming call (${call_type})`
              : `Outgoing call  (${call_type})`;

    return (
        <div className={classes.detailsContainer}>
            <Typography align="center" variant="overline">
                {callDirectionAndType}
            </Typography>
            <TableContainer>
                <Table aria-label="call details table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
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
