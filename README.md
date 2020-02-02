# react-render-iff

![carbon (34)](https://user-images.githubusercontent.com/5778798/73144670-158b7100-4076-11ea-84e0-6b01bf1a42e1.png)

[![NPM](https://img.shields.io/npm/v/sd.svg)](https://www.npmjs.com/package/sd) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-render-repeat
```

## Usage

Import as "RenderRepeat" and use as illustrated in the examples below. There are many more powerful usages that may not be illustrated, so take a look at the source code to see what more you can do.

```jsx
import React, { Component } from "react";

import RenderRepeat from "react-render-repeat";

class Example extends Component {
  render() {

   

    return (
      <div>
        <h1>Example uses</h1>

        <div>
          <h2>Example 1:</h2>
          <p>
            Provide the datasource as "list" and your render arrow function as "render".
          </p>
          <RenderRepeat
            list={[{id: 'uA1', name: 'User A'}, {id: 'uB2', name: 'User B'}, {id: 'uC3', name: 'User C'}]}
            render={({el, index, isLast}) => {
                return (
                  <div>
                    <p>ID: {el.id}</p>
                    <p>Name: {el.name}</p>
                    {isLast ? <p>As index {index}, I'm the last in the list</p> : null}
                  </div>
                )
            }}
          />

          <div>
            <h3>🌴 The output of this example should be:</h3>
            
            <div>
              <p>ID: uA1</p>
              <p>Name: User A</p>
            </div>
            <div>
              <p>ID: uB2</p>
              <p>Name: User B</p>
            </div>
            <div>
              <p>ID: uC3</p>
              <p>Name: User C</p>
              <p>At index 2, I'm the last in the list</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

## License

By [Lincoln W Daniel](https://lincolnwdaniel.com)

MIT © [Lwdthe1](https://github.com/Lwdthe1)
