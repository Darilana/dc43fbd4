import React, { useState } from 'react';
import { ActivityCall } from '../../types/activity';
import { CallDirection, CallType } from '../../constants/activity';
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
import { formatTime } from '../../utils/formatTime';

const useStyles = makeStyles(() => ({
    container: {
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
    const formattedDate = formatTime(created_at);

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <Card className={classes.container}>
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
                    <Typography>{formattedDate}</Typography>
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
