import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
const Home = lazy(() => import("../../../features/Feature1"));
const ProgressIndicator = lazy(() => import("../UI/ProgressIndicator"));
const PageNotFound = lazy(
  () => import("../../../components/Common/UI/PageNotFound")
);
const AppSideBar = lazy(() => import("../Layout/AppSidebar"));

type Props = {
  toggleMenuCollapse: (value: boolean) => void;
};
const AppRoutes = (props: Props) => {
  return (
    <Router>
      <Suspense fallback={<ProgressIndicator />}>
        <AppSideBar toggleMenuCollapse={props.toggleMenuCollapse} />
        <div>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<PageNotFound title="No data found." />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
