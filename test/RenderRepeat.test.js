import React from "react";
import pjson from "../package.json";
import path from "path";
import renderer from "react-test-renderer";

// Test the root of the lib
const RenderRepeat = require(path.join(__dirname, "../", pjson.main)).default;

test("Example 1", () => {
  const list = [
    { id: "uA1", name: "User A" },
    { id: "uB2", name: "User B" },
    { id: "uC3", name: "User C" }
  ];

  const component = renderer.create(
    <RenderRepeat
      list={list}
      render={({ el, index, isLast }) => {
        return (
          <div key={el.id}>
            <p>ID: {el.id}</p>
            <p>Name: {el.name}</p>
            {isLast ? <p>As index {index}, I'm the last in the list</p> : null}
          </div>
        );
      }}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Example 2: Render with placeholders", () => {
  const list = [
    { id: "uA1", name: "User A" },
    { id: "uB2", name: "User B" },
    { id: "uC3", name: "User C" },
    { $isPlaceholder: true },
    { $isPlaceholder: true },
    { $isPlaceholder: true },
    { $isPlaceholder: true },
    { $isPlaceholder: true }
  ];

  const component = renderer.create(
    <RenderRepeat
      list={list}
      render={({ el, index, isLast }) => {
        return (
          <div key={el.id}>
            <p>ID: {el.id}</p>
            <p>Name: {el.name}</p>
            {isLast ? <p>As index {index}, I'm the last in the list</p> : null}
          </div>
        );
      }}
      isPlaceholder={({ $isPlaceholder }) => !!$isPlaceholder}
      renderPlaceholder={({ index }) => (
        <div className="u-relative" key={`placeholder${index}`}>
          <p>I am the #{index} loading indicator ... </p>
          <p>
            I should be replaced after the real data returns from the server.
          </p>
        </div>
      )}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Example 3: Render with placeholders with isLast check", () => {
  const list = [
    { id: "uA1", name: "User A" },
    { id: "uB2", name: "User B" },
    { $isPlaceholder: true },
    { $isPlaceholder: true },
    { $isPlaceholder: true }
  ];

  const renderListElement = ({ el, index }) => {
    return <p key={el.id}>Element at index {index}</p>;
  };

  const checkElementIsPlaceholder = ({ $isPlaceholder }) => !!$isPlaceholder;

  const renderPlaceholderElement = ({ index, isLast }) => (
    <p key={`placeholder${index}`}>
      Placeholder at index {index}{" "}
      {isLast ? <span>is last!</span> : <span>is not last.</span>}
    </p>
  );

  const component = renderer.create(
    <RenderRepeat
      list={list}
      render={renderListElement}
      isPlaceholder={checkElementIsPlaceholder}
      renderPlaceholder={renderPlaceholderElement}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
