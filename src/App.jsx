import React from 'react'
import Accordion from './components/accordion/Accordion'
import RandomColor from './components/random_color/RandomColor'
import StarRating from './components/star_rating/StarRating'
import ImageSlider from './components/image_slider/ImageSlider'
import ImageGallery from './components/image_slider/ImageGallery'
import LoadMore from './components/load_more/LoadMore'
import TreeView from './components/tree-view/TreeView'
import QRCodeGenerator from './components/qr-code/QRCodeGenerator'
import ChangeTheme from './components/change_theme/ChangeTheme'
import ScrollIndicator from './components/scroll_indicator/ScrollIndicator'

const App = () => {
  return (
    <>
      {/* <Accordion /> */}
      {/* <RandomColor /> */}
      {/* <StarRating /> */}
      {/* <ImageSlider url={"https://picsum.photos/v2/list"} limit={5} page={1}/> */}
      {/* <ImageGallery url={"https://picsum.photos/v2/list"}/> */}
      {/* <LoadMore /> */}
      {/* <TreeView /> */}
      {/* <QRCodeGenerator /> */}
      {/* <ChangeTheme /> */}
      <ScrollIndicator url={'https://dummyjson.com/products?limit=100'} />
    </>
  )
}

export default App