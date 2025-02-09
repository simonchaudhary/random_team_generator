import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Loading from '../components/Loading';
import { ROUTES } from '../constants/routes';

const Team = lazy(() => import('../tabs/team'));
const Player = lazy(() => import('../tabs/player'));
const TeamGeneration = lazy(() => import('../tabs/teamGeneration'));
const TeamGenerationDetail = lazy(() => import('../tabs/teamGenerationDetail'));

const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<Loading />}>
            <Player />
          </Suspense>
        )
      },
      {
        path: ROUTES.TEAM,
        element: (
          <Suspense fallback={<Loading />}>
            <Team />
          </Suspense>
        )
      },
      {
        path: ROUTES.TEAM_GENERATION,
        element: (
          <Suspense fallback={<Loading />}>
            <TeamGeneration />
          </Suspense>
        ),
        children: [
          {
            path: ':id',
            element: (
              <Suspense fallback={<Loading />}>
                <TeamGenerationDetail />
              </Suspense>
            )
          }
        ]
      },

      {
        path: '*',
        element: (
          <Suspense fallback={<Loading />}>
            <PageNotFound />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;
