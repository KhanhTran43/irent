import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export type GuardRouteFuncReturn =
  | {
      result: false;
      fallback: ReactNode;
    }
  | {
      result: true;
    }
  | {
      result: string;
    };

export type GuardRouteFunc = (...args: any) => GuardRouteFuncReturn;

type GuardRouteProps = {
  guards: GuardRouteFunc[];
};

export function GuardRoute({ guards }: GuardRouteProps) {
  const resolveGuard = (): ReactNode => {
    return guards.reduce<ReactNode>(
      (prev, curr, idx, arr) => {
        const guardResult = curr();
        const element =
          guardResult.result === true ? (
            <Outlet />
          ) : guardResult.result === false ? (
            guardResult.fallback
          ) : (
            <Navigate to={guardResult.result}></Navigate>
          );

        if (guardResult.result !== true) arr.splice(1);

        return element;
      },
      <Outlet />,
    );
  };

  return <>{resolveGuard()}</>;
}
