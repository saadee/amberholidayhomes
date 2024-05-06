import { Helmet } from 'react-helmet-async';

import EcommerceLandingView from 'src/sections/_ecommerce/view/ecommerce-landing-view';

// ----------------------------------------------------------------------

export default function EcommerceLandingPage() {
  return (
    <>
      <Helmet>
        <title>Landing</title>
      </Helmet>

      <EcommerceLandingView />
    </>
  );
}
