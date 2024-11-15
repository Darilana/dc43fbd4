export const formatDate = (dateToConvert: string): string => {
    const date = new Date(dateToConvert);

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
