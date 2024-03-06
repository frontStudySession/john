import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const NavigationContext = createContext({
  location: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  navigate: (path: string) => {},
});

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }: any) => {
  const [location, setLocation] = useState(window.location.pathname);

  const navigate = useCallback((path: string) => {
    if (path === 'back') {
      window.history.back();
    } else {
      window.history.pushState({}, '', path);
      setLocation(path);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setLocation(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return <NavigationContext.Provider value={{ location, navigate }}>{children}</NavigationContext.Provider>;
};

export const Routes = ({ children, className }: any) => {
  const { location } = useNavigation();
  const childrenArray = React.Children.toArray(children);
  const defaultChild = childrenArray.find((child: any) => child.props.path === '*') || null;
  const matchedChild = childrenArray.find((child: any) => child.props.path === location);

  return <div className={className}>{matchedChild || defaultChild}</div>;
};

export const Route = ({ element }: any) => {
  return element;
};
