import React, { useEffect, useState } from "react";
import { api_url } from "../api";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";

const Productmenu = () => {
  const [products, setProducts] = useState([]);
  const { firmId, firmName } = useParams();

  const ProductHandler = async () => {
    try {
      const response = await fetch(`${api_url}/Product/${firmId}/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newdata = await response.json();
      setProducts(newdata.products || []);
    } catch (error) {
      console.error("Product failed to fetch", error);
    }
  };

  useEffect(() => {
    ProductHandler();
  }, [firmId]);

  return (
    <>
      <TopBar />
      <section className="productsection"><br></br><br></br>
        <h1 className="h32">{firmName || "Firm Name not available"}</h1>
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item.id} className="ProductBox">
              <div>
                <div><strong>{item.productName}</strong></div>
                <div>₹{item.price}</div>
                <div>{item.description}</div>
              </div>
              <div className="Productgroup">
                <img
                  src={`${api_url}/uploads/${item.image}`}
                  alt={item.productName}
                />
                <div className="add-button">ADD</div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </section>
    </>
  );
};

export default Productmenu;
