import { useEffect, useState } from 'react';

// Detects mobile/low-end devices to scale down heavy effects
export const useDeviceCapability = () => {
  const [capability, setCapability] = useState({ isMobile: false, isLowEnd: false, ready: false });

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 4;
    const isLowEnd = isMobile || cores <= 4 || mem <= 4;
    setCapability({ isMobile, isLowEnd, ready: true });
  }, []);

  return capability;
};
