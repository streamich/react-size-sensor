# React `<SizeSensor />`

React component that fires `resize` events if size of its children changes.

```jsx
import {SizeSensor} from 'resize-sensor';

<SizeSensor onSize={(width, height) => {}} onResize={(width, height) => {}}>
    {/* something to track size of */}
</SizeSensor>
```

 - `onSize` - Fires with the initial size of the component when component renders for the first time.
 - `onResize` - Fires every time component's width or height changes.
 - `onWidth` - Fires every time component's width changes.
 - `onHeight` - Fires every time component's height changes.
