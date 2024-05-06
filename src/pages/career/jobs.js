import { Helmet } from 'react-helmet-async';

import CareerJobsView from 'src/sections/_career/view/career-jobs-view';

// ----------------------------------------------------------------------

export default function CareerJobsPage() {
  return (
    <>
      <Helmet>
        <title>Jobs</title>
      </Helmet>

      <CareerJobsView />
    </>
  );
}
