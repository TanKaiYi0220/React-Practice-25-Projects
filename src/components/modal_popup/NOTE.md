# Learning Note

## React
- [x] `e.stopPropagation()` can stops the click event from continuing upward to parent elements.
    - [x] `modalContainer` click event might edit message, save changes, closed or etc.
    - [x] `modalOverlay` click event will close modal window.
    - [x] w/o `e.stopPorpagation()` those click event inside `modalContainer` will also called `modalOverlay` click event (close modal window)

## CSS
- [x] `position: fixed` and `inset: 0` are suitable to implement an overlay component with full of screen.