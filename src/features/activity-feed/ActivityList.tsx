import React from 'react';
import { ActivityCall } from '../../types/call';
import { CallCard } from './CallCard';
import { useActivityContext } from '../../data/ActivityContext';
import { Loader } from '../../components/Loader';
import { EmptyActivityList } from './EmptyActivityList';

interface ActivityListProps {
    calls: ActivityCall[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ calls }) => {
    const { isActivitiesListLoading } = useActivityContext();

    if (!isActivitiesListLoading && calls.length === 0) {
        return <EmptyActivityList />;
    }

    return (
        <section>
            {isActivitiesListLoading ? (
                <Loader />
            ) : (
                calls.map((call) => <CallCard key={call.id} call={call} />)
            )}
        </section>
    );
};
