import { Outlet, Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <>
      <nav className="host-nav">
        <Link to="/host">Dashboard</Link>
        <Link to="/host/income">Income</Link>
        <Link to="/host/reviews">Reviews</Link>
      </nav>
      <Outlet />
    </>
  );
}
