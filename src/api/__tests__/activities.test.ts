import axios from 'axios';
import { mockActivitiesList } from './mocks/mockActivitiesList';
import { BASE_URL } from '../../constants/activity';
import {
    getActivities,
    getActivity,
    resetActivities,
    updateActivity,
} from '../activities';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('activities API', () => {
    describe('#getActivities', () => {
        it('should return the list of activities', async () => {
            mockedAxios.get.mockResolvedValue({ data: mockActivitiesList });

            const result = await getActivities();

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${BASE_URL}/activities`,
                { signal: undefined }
            );
            expect(result).toEqual(mockActivitiesList);
        });
    });

    describe('#getActivity', () => {
        it('should return activity with a given id', async () => {
            const id = '1';
            mockedAxios.get.mockResolvedValue({ data: mockActivitiesList[0] });

            const result = await getActivity(id);

            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${BASE_URL}/activities/${id}`,
                { signal: undefined }
            );
            expect(result).toEqual(mockActivitiesList[0]);
        });
    });

    describe('#updateActivity', () => {
        it('should update activity with a given id and request body', async () => {
            const id = '1';
            const requestBody = { is_archived: false };

            mockedAxios.patch.mockResolvedValue({ data: 'Activity updated' });

            const result = await updateActivity(id, requestBody);

            expect(mockedAxios.patch).toHaveBeenCalledWith(
                `${BASE_URL}/activities/${id}`,
                requestBody
            );
            expect(result).toEqual('Activity updated');
        });
    });

    describe('#resetActivities', () => {
        it('should reset activities', async () => {
            mockedAxios.patch.mockResolvedValue(undefined);

            const result = await resetActivities();

            expect(mockedAxios.patch).toHaveBeenCalledWith(`${BASE_URL}/reset`);
            expect(result).toBeUndefined();
        });
    });
});
