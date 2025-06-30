import { FC, ReactNode } from 'react';

interface SkeletonizerProps {
    loading: boolean;
    children: ReactNode;
    className?: string;
}
declare const Skeletonizer: FC<SkeletonizerProps>;

export { Skeletonizer };
