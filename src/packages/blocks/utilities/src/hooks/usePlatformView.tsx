import React, { ReactElement, Suspense, lazy, useCallback } from 'react';

import { useBlockHelpers } from './useBlockHelpers';

interface ReturnType<T> {
    PlatformView: React.FC<T>;
};

export function usePlatformView<T> (componentName: string, folderName: string): ReturnType<T> {
    const { isPlatformWeb } = useBlockHelpers();

    const Web = useCallback(
        lazy(() => import(`../../../${folderName}/src/${componentName}View.web`)),
    [componentName, folderName]);

    const Mobile = useCallback(
        lazy(() => import(`../../../${folderName}/src/${componentName}View`)),
    [componentName, folderName]);

    const PlatformView = (props: T): ReactElement => (
        <Suspense fallback={<></>}>
            {isPlatformWeb() ? (
                <Web testID={`${componentName}View`} {...props} />
            ) : (
                <Mobile testID={`${componentName}View`} {...props} />
            )}
        </Suspense>
    );

    return { PlatformView };
};
