import axios, { AxiosResponse } from 'axios';
import { ActivityCall } from '../types/activity';
import { BASE_URL } from '../constants/activity';

export const getActivities = async (
    signal?: AbortSignal
): Promise<ActivityCall[]> => {
    const response: AxiosResponse<ActivityCall[]> = await axios.get(
        `${BASE_URL}/activities`,
        {
            signal,
        }
    );

    return response.data;
};

export const getActivity = async (
    callId: string,
    signal?: AbortSignal
): Promise<ActivityCall> => {
    const response: AxiosResponse<ActivityCall> = await axios.get(
        `${BASE_URL}/activities/${callId}`,
        {
            signal,
        }
    );

    return response.data;
};

interface UpdateCallBody {
    is_archived: boolean;
}

export const updateActivity = async (
    callId: string,
    body: UpdateCallBody
): Promise<ActivityCall> => {
    const response: AxiosResponse<ActivityCall> = await axios.patch(
        `${BASE_URL}/activities/${callId}`,
        body
    );

    return response.data;
};

export const resetActivities = async (): Promise<void> => {
    await axios.patch(`${BASE_URL}/reset`);
};
