import React from 'react';
import { Fade, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface ErrorSnackbarProps {
    message: string;
    handleClose: () => void;
}

export const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
    message,
    handleClose,
}) => {
    return (
        <Snackbar
            open
            autoHideDuration={6000}
            TransitionComponent={Fade}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                elevation={6}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
