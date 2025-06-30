# 🦴 React Skeletonize

Automatically generate skeleton loaders based on your JSX structure — no configuration, no custom markup, just React.

![npm](https://img.shields.io/npm/v/react-skeletonize?style=flat-square)
![license](https://img.shields.io/npm/l/react-skeletonize?style=flat-square)
![minzip](https://img.shields.io/bundlephobia/minzip/react-skeletonize?style=flat-square)

---

## ✨ Features

- ⚡ Zero-config: Just wrap your components and go
- 🎨 Renders skeletons based on actual component structure
- 🧠 Clean architecture: render + logic fully separated
- 💅 Tailwind-ready, but also works with any CSS

---

## 🚀 Installation

```bash
npm install react-skeletonizer
# or
yarn add react-skeletonizer
```


---

## 📖 Usage

### Wrap your components

```jsx
import { Skeletonizer } from "react-skeletonizer"

const App = () => (
  <Skeletonizer loading={true}>
    <div>
      <h1>Hello, world!</h1>
      <p>This is a paragraph.</p>
      <button>Click me!</button>
    </div>
  </Skeletonizer>
)
```
