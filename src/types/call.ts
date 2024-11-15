import { CallDirection, CallType } from '../constants/call';

export interface ActivityCall {
    id: string;
    created_at: string;
    direction: CallDirection;
    from: string;
    to: string;
    via: string;
    duration: number;
    is_archived: boolean;
    call_type: CallType;
}
