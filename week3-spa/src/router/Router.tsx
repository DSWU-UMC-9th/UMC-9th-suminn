import { Children, isValidElement, cloneElement } from 'react';
import type { FC, ReactElement } from 'react';
import { useMemo } from 'react';
import { useCurrentPath } from './hooks';
import type { RouteProps, RoutesProps } from './types';

const isRouteElement = (el: unknown): el is ReactElement<RouteProps> =>
  isValidElement(el) &&
  typeof (el as any).props?.path === 'string' &&
  typeof (el as any).props?.component === 'function';

// Router.tsx
export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};
