# Learning Note

## React
- [x] `npm run dev` will generate `Strict.Mode` lead to useEffects will be run twice, which make `fetch()` will be run twice.
    - [x] `setProducts((currentProducts) => [...currentProducts, ...data.products]` will cause `array` be pushed twice w/o any manual protection.
    - [x] `const nextProducts = [...products, ...data.products]; setProducts(nextProducts);`, however, do not use any `prevState` information that is fined.
- [x] `useState` vs `useRef`
    - [x] `useState` for those variables affect the UI
    - [x] `useRef` for those variables will not updated on screen
- [x] `IntersectionObserver` built-in feature supports that implementation around `visibility` UI/UX

## CSS