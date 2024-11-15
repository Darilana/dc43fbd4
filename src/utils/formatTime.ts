export const formatTime = (dateToConvert: string): string => {
    const date = new Date(dateToConvert);

    return date.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
        minute: 'numeric',
    });
};
