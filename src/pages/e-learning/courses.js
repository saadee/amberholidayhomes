import { Helmet } from 'react-helmet-async';

import ElearningCoursesView from 'src/sections/_elearning/view/elearning-courses-view';

// ----------------------------------------------------------------------

export default function ElearningCoursesPage() {
  return (
    <>
      <Helmet>
        <title>Courses</title>
      </Helmet>

      <ElearningCoursesView />
    </>
  );
}
