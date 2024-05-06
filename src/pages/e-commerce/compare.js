import { Helmet } from 'react-helmet-async';

import EcommerceCompareView from 'src/sections/_ecommerce/view/ecommerce-compare-view';

// ----------------------------------------------------------------------

export default function EcommerceComparePage() {
  return (
    <>
      <Helmet>
        <title>Compare</title>
      </Helmet>

      <EcommerceCompareView />
    </>
  );
}
