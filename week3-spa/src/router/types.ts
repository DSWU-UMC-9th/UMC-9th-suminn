import type { ComponentType, ReactNode } from 'react';

export interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export interface RouteProps {
  path: string;
  component: ComponentType<any>;
}

export interface RoutesProps {
  children: ReactNode;
}
