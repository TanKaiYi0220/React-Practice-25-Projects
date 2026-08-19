import React from 'react'
import ImageSlider from './ImageSlider'

const ImageGallery = ({ url }) => {
    return (
        <div className="galleryContainer">
            <ImageSlider url={url} page={1} limit={5} author={"Shiro"} reverse={ false } />
            <ImageSlider url={url} page={2} limit={5} author={"Sora"} reverse={ true } />
        </div>
    )
}

export default ImageGallery