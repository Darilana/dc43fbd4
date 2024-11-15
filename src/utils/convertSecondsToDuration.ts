export const convertSecondsToDuration = (secondsToFormat: number): string => {
    const hours: string | number = Math.floor(secondsToFormat / 3600);
    const minutes: string | number = Math.floor(
        (secondsToFormat - hours * 3600) / 60
    );
    const seconds: string | number =
        secondsToFormat - hours * 3600 - minutes * 60;

    if (!hours && !minutes) {
        return seconds + ' secs';
    }

    if (!hours) {
        return minutes + ' mins ' + seconds + ' secs';
    }

    return hours + ' hours ' + minutes + ' mins ' + seconds + ' secs';
};
