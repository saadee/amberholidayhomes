import { Helmet } from 'react-helmet-async';

import CareerLandingView from 'src/sections/_career/view/career-landing-view';

// ----------------------------------------------------------------------

export default function CareerLandingPage() {
  return (
    <>
      <Helmet>
        <title>Landing</title>
      </Helmet>

      <CareerLandingView />
    </>
  );
}
