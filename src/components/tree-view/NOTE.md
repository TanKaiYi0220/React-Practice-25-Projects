# Learning Note

## React
- `useState()` can be treated as shared state by passing as `props` to children component, which is **lifting state up** design
- Recursive component can be easily implemented by recursive with two component, like: `TreeView -> MenuList -> MenuItem -> MenuList -> MenuItem ...` 

## CSS
- `parent > child` is convenient for recursive design
    - `.treeViewContainer > .menuListContainer` focusing on design the `sideBar` container
    - `.menuItemContainer > .menuListContainer` focusing on expanded list of items.