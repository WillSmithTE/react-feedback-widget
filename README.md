A customizable feedback widget for React applications.

## Installation

```bash
npm install {{PACKAGE_NAME}}
```

or

```bash
yarn add {{PACKAGE_NAME}}
```

## Usage

```jsx
import React from "react";
import { FeedbackWidget } from "{{PACKAGE_NAME}}";

const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <FeedbackWidget />
    </div>
  );
};

export default App;
```

## Props

| Prop     | Type     | Default | Description                                         |
| -------- | -------- | ------- | --------------------------------------------------- |
| onSubmit | function | -       | Callback function called when feedback is submitted |

## Dev

Need to link React, or get invalid hook call error.

```bash
npm link ../appname/node_modules/react
```

## License

MIT
