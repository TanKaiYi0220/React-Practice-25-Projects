import React, { useEffect } from 'react'
import { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import "./style.css"

const ImageSlider = ({ url, limit, page }) => {
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  function imagesComponent(item, index) {
    return <img
      key={item.id}
      alt={item.download_url}
      src={item.download_url}
      className={imageIndex == index ? "currentImage" : "hiddenImage"}
    />
  }

  function indicatorComponent(item, index) {
    return <button
      key={item.id}
      onClick={() => { setImageIndex(index) }}
      className={imageIndex == index ? "activeIndicator" : "inactiveIndicator"}
    />
  }

  const renderImages = (component) => {
    return (images && images.length > 0) ?
      images.map((item, index) => (
        component(item, index)
      )) : null;
  }

  function handlePrevious() {
    setImageIndex(imageIndex == 0 ? images.length - 1 : imageIndex - 1);
  }

  function handleNext() {
    setImageIndex(imageIndex == images.length - 1 ? 0 : imageIndex + 1);
  }

  useEffect(() => {
    if (url != "") fetchImages(url);
  }, [url])


  return (
    <div className="imageSliderContainer">
      <BsArrowLeftCircleFill onClick={() => { handlePrevious() }} className="arrow arrow-left" />
      <div className="imageContainer">
        {(loading)
          ? "Loading ..."
          : renderImages(imagesComponent)
        }
      </div>
      <BsArrowRightCircleFill onClick={() => { handleNext() }} className="arrow arrow-right" />
      <span className="imageIndicator">
        {renderImages(indicatorComponent)}
      </span>
    </div>
  )
}

export default ImageSlider