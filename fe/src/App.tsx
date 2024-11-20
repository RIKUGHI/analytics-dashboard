import { FC, useState } from "react";
import { FaX } from "react-icons/fa6";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ReportPage, TripPage } from "./pages";

const App: FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Router>
        <aside
          className={`fixed top-0 bottom-0 w-[300px] space-y-2 shadow-md bg-white ${
            openMenu ? "block" : "hidden"
          } md:block`}
        >
          <div className="rounded p-2 bg-orange-600 text-white">
            <Link className="block text-lg" to="/">
              Report
            </Link>
          </div>
          <div className="rounded p-2 bg-orange-600 text-white">
            <Link className="block text-lg" to="/trips">
              Trips
            </Link>
          </div>
          <button
            className="w-10 h-10 md:hidden"
            onClick={() => setOpenMenu(false)}
          >
            <FaX size={25} />
          </button>
        </aside>
        <Routes>
          <Route
            path="/"
            element={<ReportPage onOpenMenu={() => setOpenMenu(!openMenu)} />}
          />
          <Route
            path="/trips"
            element={<TripPage onOpenMenu={() => setOpenMenu(!openMenu)} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
