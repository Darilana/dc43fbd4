import { convertSecondsToDuration } from '../convertSecondsToDuration';

describe('#convertSecondsToDuration', () => {
    it('should return only seconds if less than a minute', () => {
        expect(convertSecondsToDuration(40)).toEqual('40 secs');
    });

    it('should return minutes and seconds if less than an hour', () => {
        expect(convertSecondsToDuration(320)).toEqual('5 mins 20 secs');
    });

    it('should return hours, minutes, and seconds if more than an hour', () => {
        expect(convertSecondsToDuration(1255)).toEqual('20 mins 55 secs');
    });

    it('should handle 0 seconds correctly', () => {
        expect(convertSecondsToDuration(0)).toBe('0 secs');
    });
});
