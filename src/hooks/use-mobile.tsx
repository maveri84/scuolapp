
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [isClient, setIsClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Set the initial value
    handleResize();
    
    // Add event listener with passive option for better performance
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Cleanup function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return false during SSR, and the actual value after hydration
  return isClient ? isMobile : false;
}
