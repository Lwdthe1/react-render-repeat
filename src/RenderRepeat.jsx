const isFunc = functionToCheck => {
  if (!functionToCheck) return false;

  const getType = {};
  const toString = getType.toString.call(functionToCheck);

  return (
    toString === "[object Function]" ||
    toString === "[object AsyncFunction]" ||
    false
  );
};

const evaluateValue = (prop, data) =>
  prop && isFunc(prop) ? prop(data) : prop;

export default function RenderRepeat(props) {
  const { render, renderPlaceholder, isPlaceholder } = props;
  const list = evaluateValue(props.list) || [];

  return list.map((el, index) => {
    const data = {
      el,
      index,
      isFirst: index === 0,
      isLast: index === list.length - 1,
      isSecondLast: index === list.length - 2
    };

    if (renderPlaceholder && isPlaceholder(el)) {
      return renderPlaceholder(data);
    }

    return render(data);
  });
}
