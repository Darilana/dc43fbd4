import React, { useState } from 'react';
import { ActivityCall } from '../../types/call';
import { CallDirection, CallType } from '../../constants/call';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import {
    Box,
    CardActionArea,
    Card,
    CardContent,
    Typography,
    makeStyles,
    Collapse,
} from '@material-ui/core';
import { CallDetails } from './CallDetails';
import { formatDate } from '../../utils/formatDate';

const useStyles = makeStyles(() => ({
    root: {
        marginBottom: '1rem',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

interface CallCardProps {
    call: ActivityCall;
}

export const CallCard: React.FC<CallCardProps> = ({ call }) => {
    const { id, created_at, direction, from, to, call_type } = call;
    const date = formatDate(created_at);

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleExpandClick}>
                <CardContent className={classes.content}>
                    <Box>
                        {call_type === CallType.Missed ? (
                            <PhoneMissedIcon color="error" />
                        ) : direction === CallDirection.Inbound ? (
                            <PhoneCallbackIcon />
                        ) : (
                            <PhoneForwardedIcon />
                        )}
                    </Box>
                    <Typography>
                        {direction === CallDirection.Inbound ? from : to}
                    </Typography>
                    <Typography>{date}</Typography>
                </CardContent>
            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <CallDetails callId={id} />
                </CardContent>
            </Collapse>
        </Card>
    );
};
