# react-render-repeat

![carbon (35)](https://user-images.githubusercontent.com/5778798/73617125-a5d33400-45e9-11ea-8e98-fb65bc3b6355.png)

[![NPM](https://img.shields.io/npm/v/react-render-repeat.svg)](https://www.npmjs.com/package/react-render-repeat) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-render-repeat
```

## Usage

Import as "RenderRepeat" and use as illustrated in the examples below. There are many more powerful usages that may not be illustrated, so take a look at the source code to see what more you can do.

### Props

`list: Array`: The datasource (array) from which to render components.

`render: ({el: Object, index: Number, isFirst: Boolean, isSecondLast: Boolean, isLast: Boolean}) => Node`: An arrow function to render a component for each element in the `list`.

`isPlaceholder: (element) => Boolean`: An arrow function that returns whether or not the current element should be rendered, treated as a placeholder.

`renderPlaceholder: ({el: Object, index: Number, isFirst: Boolean, isSecondLast: Boolean, isLast: Boolean}) => Node`: An arrow function that renders a component when `isPlaceholder` returns `true` for that element.

### Examples

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
            Provide the datasource as "list" and your render arrow function as
            "render".
          </p>
          <RenderRepeat
            list={[
              { id: "uA1", name: "User A" },
              { id: "uB2", name: "User B" },
              { id: "uC3", name: "User C" }
            ]}
            render={({ el, index, isLast }) => {
              return (
                <div>
                  <p>ID: {el.id}</p>
                  <p>Name: {el.name}</p>
                  {isLast ? (
                    <p>As index {index}, I'm the last in the list</p>
                  ) : null}
                </div>
              );
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

        <div>
          <h2>Example 2: Placeholders</h2>
          <p>
            When paginating your datasource from the server, you may want to
            show placeholders while you wait for the server's response of more
            items. RenderRepeat supports that case.
            <br />
            <br />
            To render placeholders, simply include placeholder elements in your datasource
            and provide two extra props: "isPlaceholder" and "renderPlaceholder";
            both must be arrow functions. "isPlaceholder" should return true if an
            element should be rendered as a placeholder by "renderPlaceholder".
            <br />
            <br />
            If "isPlaceholder" returns true for an element, that element will be
            rendered by "renderPlaceholder" instead of "render".
            <br />
            <br />
            Once your server responds with the real data, replace the placeholder
            elements with the real data. At that point, RenderRepeat will rerender
            your list with the new paginated data.
          </p>
          <RenderRepeat
            list={[
              { id: "uA1", name: "User A" },
              { id: "uB2", name: "User B" },
              { $isPlaceholder: true },
              { $isPlaceholder: true },
              { $isPlaceholder: true }
            ]}
            render={({ el, index, isLast }) => {
              return (
                <div key={el.id}>
                  <p>ID: {el.id}</p>
                  <p>Name: {el.name}</p>
                  {isLast ? (
                    <p>As index {index}, I'm the last in the list</p>
                  ) : null}
                </div>
              );
            }}
            isPlaceholder={({ $isPlaceholder }) => !!$isPlaceholder}
            renderPlaceholder={({ index }) => (
              <div key={`placeholder${index}`}>
                <p>I am the loading indicator at index {index} ... </p>
                <p>
                  I should be replaced after the real data returns from the
                  server.
                </p>
              </div>
            )}
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
              <p>I am the loading indicator at index 3 ...</p>
              <p>
                I should be replaced after the real data returns from the
                server.
              </p>
            </div>
            <div>
              <p>I am the loading indicator at index 4 ...</p>
              <p>
                I should be replaced after the real data returns from the
                server.
              </p>
            </div>
            <div>
              <p>I am the loading indicator at index 5 ...</p>
              <p>
                I should be replaced after the real data returns from the
                server.
              </p>
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
