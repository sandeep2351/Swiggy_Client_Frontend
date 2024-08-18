import React, { useState, useEffect } from "react";
import { api_url } from "../api";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [firmdata, setFirmdata] = useState([]);
  const [selectedregion, setSelectedregion] = useState('All');

  const firmdatahandler = async () => {
    try {
      const response = await fetch(`${api_url}/vendor/all-vendors`);
      const data = await response.json(); // Renamed `firmdata` to `data` for clarity
      setFirmdata(data.vendors || []);
    } catch (error) {
      alert("Firm data not fetched");
      console.error("Firm data not fetched", error);
    }
  };

  useEffect(() => {
    firmdatahandler();
  }, []);

  const filterhandler = (region) => {
    setSelectedregion(region);
  };

  return (
    <>
      <h3 className="h31">
        Restaurants with online food delivery in Hyderabad
      </h3>
      <div className="filterbuttons">
        <button
          onClick={() => filterhandler('All')}
          className={selectedregion === 'All' ? 'active' : ''}
        >
          All
        </button>
        <button
          onClick={() => filterhandler('south-indian')}
          className={selectedregion === 'south-indian' ? 'active' : ''}
        >
          South-Indian
        </button>
        <button
          onClick={() => filterhandler('north-indian')}
          className={selectedregion === 'north-indian' ? 'active' : ''}
        >
          North-Indian
        </button>
        <button
          onClick={() => filterhandler('chinese')}
          className={selectedregion === 'chinese' ? 'active' : ''}
        >
          Chinese
        </button>
        <button
          onClick={() => filterhandler('Bakery')}
          className={selectedregion === 'Bakery' ? 'active' : ''}
        >
          Bakery
        </button>
      </div>
      <section className="firmsection">
        {firmdata.length > 0 ? (
          firmdata.map((item, index) => (
            item.firm && item.firm.length > 0 ? (
              item.firm
                .filter(data => selectedregion === 'All' || data.region.includes(selectedregion.toLowerCase()))
                .map((data, i) => (
                  <Link key={`${index}-${i}`} to={`/products/${data._id}/${encodeURIComponent(data.firmName)}`}>
                    <div className="firmItem">
                      <div className="firmImage">
                        <img
                          src={`${api_url}/uploads/${data.image}`}
                          alt={data.firmName}
                        />
                        {data.offer && <div className="firmoffer">{data.offer}</div>}
                      </div>
                      <div className="firmdetails">
                        <strong className="firmname">{data.firmName}</strong>
                        <div className="firmarea">{data.region.join(", ")}</div>
                        <div className="firmarea">{data.area}</div>
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              <p>No firms available.</p>
            )
          ))
        ) : (
          <p>Loading...</p> // Added loading state
        )}
      </section>
    </>
  );
};

export default FirmCollections;
