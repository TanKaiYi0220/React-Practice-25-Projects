import React from 'react'
import Accordion from './components/accordion/Accordion'
import RandomColor from './components/random_color/RandomColor'
import StarRating from './components/star_rating/StarRating'
import ImageGallery from './components/image_slider/ImageGallery'

const App = () => {
  return (
    <>
      {/* <Accordion /> */}
      {/* <RandomColor /> */}
      {/* <StarRating /> */}
      {/* <ImageSlider url={"https://picsum.photos/v2/list"} limit={5} page={1}/> */}
      <ImageGallery url={"https://picsum.photos/v2/list"}/>
    </>
  )
}

export default App