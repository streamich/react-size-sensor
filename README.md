# React `<SizeSensor />`

React component that fires even if size of its children changes.

```jsx
import {SizeSensor} from 'resize-sensor';

<SizeSensor onSize={(width, height) => {}} onResize={(width, height) => {}}>
    {/* something to track size of */}
</SizeSensor>
```

`onSize` - Fires with the initial size of the component when component renders for the first time.
`onResize` - Fires every time componets width or height changes.
`onWidth` - Fires every time components width changes.
`onHeight` - Fires every time components height changes.
