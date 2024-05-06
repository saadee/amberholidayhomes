import { Helmet } from 'react-helmet-async';

import EcommerceOrderCompletedView from 'src/sections/_ecommerce/view/ecommerce-order-completed-view';

// ----------------------------------------------------------------------

export default function EcommerceOrderCompletedPage() {
  return (
    <>
      <Helmet>
        <title>Order Completed</title>
      </Helmet>

      <EcommerceOrderCompletedView />
    </>
  );
}
