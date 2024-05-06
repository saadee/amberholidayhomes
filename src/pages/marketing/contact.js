import { Helmet } from 'react-helmet-async';

import MarketingContactView from 'src/sections/_marketing/view/marketing-contact-view';

// ----------------------------------------------------------------------

export default function MarketingContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>

      <MarketingContactView />
    </>
  );
}
