import { breakpoints } from '@breakpoints';
import { useEffect, useState } from 'react';

type State = {
    width: undefined | number;
    height: undefined | number;
};

type DeviceType = 'mobile' | 'tablet' | 'desktop' | undefined;

const initialState: State = {
    width: undefined,
    height: undefined,
};

export function useBreakpoint() {
    const [windowSize, setWindowSize] = useState<State>(initialState);
    const [deviceType, setDeviceType] = useState<DeviceType>(undefined);

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerHeight,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const windowSizeWidth = windowSize.width as number;
        const isMobile = windowSizeWidth < breakpoints.sm;
        const isTablet = windowSizeWidth > breakpoints.sm && windowSizeWidth < breakpoints.lg;
        const isDesktop = windowSizeWidth > breakpoints.lg;

        if (isMobile) {
            setDeviceType('mobile');
        }
        if (isTablet) {
            setDeviceType('tablet');
        }
        if (isDesktop) {
            setDeviceType('desktop');
        } else setDeviceType(undefined);
    }, [windowSize.width]);

    return { windowSize, deviceType };
}
