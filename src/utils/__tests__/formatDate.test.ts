import { formatDate } from '../formatDate';

describe('#formatDate', () => {
    it('should format date to display month, day and year', () => {
        expect(formatDate('2024-07-15T10:30:00Z')).toEqual('Jul 15, 2024');
    });

    it('should "Invalid Date" for invalid date strings', () => {
        expect(formatDate('invalid-date')).toEqual('Invalid Date');
    });

    it('should "Invalid Date" for empty input', () => {
        expect(formatDate('')).toEqual('Invalid Date');
    });
});
