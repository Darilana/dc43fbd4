import { formatTime } from '../formatTime';

describe('#formatTime', () => {
    it('should format date to 12-hour time with AM/PM taking into account time zone', () => {
        expect(formatTime('2024-11-15T10:30:00Z')).toBe(
            new Date('2024-11-15T10:30:00Z').toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                timeZone: 'America/Vancouver',
            })
        );
        expect(formatTime('2024-11-15T22:45:00Z')).toBe(
            new Date('2024-11-15T22:45:00Z').toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                timeZone: 'America/Vancouver',
            })
        );
    });

    it('should adjust for different time zones', () => {
        const date = new Date('2024-11-15T15:30:00Z');
        const expected = date.toLocaleString('de-DE', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        expect(formatTime('2024-11-15T15:30:00Z')).toBe(expected);
    });

    it('should "Invalid Date" for invalid date strings', () => {
        expect(formatTime('invalid-date')).toEqual('Invalid Date');
    });

    it('should "Invalid Date" for empty input', () => {
        expect(formatTime('')).toEqual('Invalid Date');
    });
});
