import { Helmet } from 'react-helmet-async';

import EcommerceProductView from 'src/sections/_ecommerce/view/ecommerce-product-view';

// ----------------------------------------------------------------------

export default function EcommerceProductPage() {
  return (
    <>
      <Helmet>
        <title>Apple iPhone</title>
      </Helmet>

      <EcommerceProductView />
    </>
  );
}
