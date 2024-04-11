import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVans } from "../../API";

export default function HostVans() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadHostVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    loadHostVans();
  }, []);

  const hostVansElement = vans.map((van) => (
    <Link to={van.id} key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <section>{hostVansElement}</section>
      </div>
    </section>
  );
}
