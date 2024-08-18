import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { api_url } from '../api'; // Ensure this import is correct

const Chains = () => {
    const [vendordata, setVendordata] = useState({ vendors: [] });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const vendorfirmhandler = async () => {
        try {
            const response = await fetch(`${api_url}/vendor/all-vendors`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setVendordata(data);
            setLoading(false);
        } catch (error) {
            alert("Failed to fetch the data");
            console.error("Failed to fetch data", error);
            setLoading(true);
        }
    };

    useEffect(() => {
        vendorfirmhandler();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = vendordata.vendors.length - Math.floor(window.innerWidth / (320 + 20)); // Adjust based on item width (320px) and margin (20px)
            return prevIndex < maxIndex ? prevIndex + 1 : prevIndex;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    if (loading) {
        return (
            <div className="loadingsection">
                <div className="loader">
                    Your 🍜🍛 is Loading...
                </div>
                <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
                />
            </div>
        );
    }

    return (
        <div className="chainsection-wrapper">
            <h3>Top restaurant chains in Hyderabad</h3>
            <div className="navigation-buttons">
                <button
                    onClick={handlePrev}
                    className={currentIndex === 0 ? 'disabled' : 'active'}
                    disabled={currentIndex === 0}
                >
                    ←
                </button>
                <button
                    onClick={handleNext}
                    className={
                        currentIndex >= vendordata.vendors.length - Math.floor(window.innerWidth / (320 + 20))
                            ? 'disabled'
                            : 'active'
                    }
                    disabled={
                        currentIndex >= vendordata.vendors.length - Math.floor(window.innerWidth / (320 + 20))
                    }
                >
                    →
                </button>
            </div>
            <div className="chainsection">
                <div
                    className="gallery-container"
                    style={{
                        transform: `translateX(-${currentIndex * (320 + 20)}px)`, // 320px for image width + 20px for margin
                        width: `${vendordata.vendors.length * (320 + 20)}px` // Total width of all images
                    }}
                >
                    {vendordata.vendors.map((vendor, index) => (
                        <div className="vendorbox" key={index}>
                            {vendor.firm.map((item, itemIndex) => (
                                <React.Fragment key={itemIndex}>
                                    <div>
                                        {/* {item.firmName} */}
                                    </div>
                                    <div className="firmimage">
                                        <img
                                            src={`${api_url}/uploads/${item.image}`}
                                            alt={`Vendor ${index}`}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chains;
