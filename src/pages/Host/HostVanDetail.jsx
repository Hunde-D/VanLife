import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function HostVanDetail() {
  const params = useParams();
  const [hostVan, setHostVan] = useState(null);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setHostVan(data.vans));
  }, [params.id]);

  return (
    <div className="van-detail-container">
      {hostVan ? (
        <div className="van-detail">
          <img src={hostVan.imageUrl} />
          <i className={`van-type ${hostVan.type} selected`}>{hostVan.type}</i>
          <h2>{hostVan.name}</h2>
          <p className="van-price">
            <span>${hostVan.price}</span>/day
          </p>
          <p>{hostVan.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
