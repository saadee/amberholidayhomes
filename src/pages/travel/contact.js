import { Helmet } from 'react-helmet-async';

import TravelContactView from 'src/sections/_travel/view/travel-contact-view';

// ----------------------------------------------------------------------

export default function TravelContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>

      <TravelContactView />
    </>
  );
}
