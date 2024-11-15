export const BASE_URL = 'https://aircall-api.onrender.com';

export enum CallDirection {
    Inbound = 'inbound',
    Outbound = 'outbound',
}

export enum CallType {
    Missed = 'missed',
    Answered = 'answered',
    Voicemail = 'voicemail',
}
