import { Helmet } from 'react-helmet-async';

import EcommerceCheckoutView from 'src/sections/_ecommerce/view/ecommerce-checkout-view';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <EcommerceCheckoutView />
    </>
  );
}
