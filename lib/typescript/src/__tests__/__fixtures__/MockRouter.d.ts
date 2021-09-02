import { CommonNavigationAction, DefaultRouterOptions, Router } from '@react-navigation/routers';
export declare type MockActions = CommonNavigationAction | {
    type: 'NOOP' | 'UPDATE';
};
export declare const MockRouterKey: {
    current: number;
};
export default function MockRouter(options: DefaultRouterOptions): Router<Readonly<{
    key: string;
    index: number;
    routeNames: string[];
    history?: unknown[] | undefined;
    routes: (Readonly<{
        key: string;
        name: string;
        path?: string | undefined;
    }> & Readonly<{
        params?: Readonly<object | undefined>;
    }> & {
        state?: Readonly<any> | import("@react-navigation/routers").PartialState<Readonly<any>> | undefined;
    })[];
    type: string;
    stale: false;
}>, MockActions>;
