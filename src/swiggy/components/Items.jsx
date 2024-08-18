import React, { useState } from 'react';
import { itemdata } from '../data'; // Assuming correct path

const Items = () => {
    const [display, setDisplay] = useState(itemdata);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            // Calculate the maximum index based on visible items
            const maxIndex = display.length - Math.floor(window.innerWidth / (150 + 10)); // Adjust based on item width and margin
            return prevIndex < maxIndex ? prevIndex + 1 : prevIndex;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    return (
        <div className="itemsection-wrapper">
            <h1 className="itemsection-title">What's on your mind?</h1>
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
                    className={currentIndex >= display.length - Math.floor(window.innerWidth / (150 + 10)) ? 'disabled' : 'active'}
                    disabled={currentIndex >= display.length - Math.floor(window.innerWidth / (150 + 10))}
                >
                    →
                </button>
            </div>
            <div className="itemsection">
                <div
                    className="gallery-container"
                    style={{
                        transform: `translateX(-${currentIndex * (150 + 10)}px)`, // 150px for image width + 10px for margin
                        width: `${display.length * (150 + 10)}px` // Total width of all images
                    }}
                >
                    {display.map((item, index) => (
                        <div className="gallery" key={index}>
                            <img src={item.item_image} alt={`Item ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Items;
