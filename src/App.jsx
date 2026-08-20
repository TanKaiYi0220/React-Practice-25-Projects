import React from 'react'
import Accordion from './components/accordion/Accordion'
import RandomColor from './components/random_color/RandomColor'
import StarRating from './components/star_rating/StarRating'
import ImageSlider from './components/image_slider/ImageSlider'
import ImageGallery from './components/image_slider/ImageGallery'
import LoadMore from './components/load_more/LoadMore'
import TreeView from './components/tree-view/TreeView'

const App = () => {
  return (
    <>
      {/* <Accordion /> */}
      {/* <RandomColor /> */}
      {/* <StarRating /> */}
      {/* <ImageSlider url={"https://picsum.photos/v2/list"} limit={5} page={1}/> */}
      {/* <ImageGallery url={"https://picsum.photos/v2/list"}/> */}
      {/* <LoadMore /> */}
      <TreeView />
    </>
  )
}

export default App