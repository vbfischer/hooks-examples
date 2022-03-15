import React from "react";

const Child = () => {
  console.group("%c    Child: render start", "color: MediumSpringGreen");

  const [count, setCount] = React.useState(() => {
    console.log("%c    Child: setState Initializer!!", "color: tomato");
    return 0;
  });

  React.useEffect(() => {
    console.log("%c    Child: useEffect no dependencies (each time rendered)", "color: LightCoral");
    return () => {
      console.log(
        "%c    Child: noDependencies cleanup 🧹",
        "color: LightCoral"
      );
    };
  });

  React.useEffect(() => {
    console.log(
      "%c    Child: deps empty (called on first render) ",
      "color: MediumTurquoise"
    );
    return () => {
      console.log(
        "%c    Child: deps empty cleanup 🧹",
        "color: MediumTurquoise"
      );
    };
  }, []);

  React.useEffect(() => {
    console.log("%c    count is updated", "color: HotPink");
    return () => {
      console.log(
        "%c    count is updated cleanup 🧹",
        "color: HotPink"
      );
    };
  }, [count]);

  const element = (
    <button onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );

  console.log("%c    Child: render end", "color: MediumSpringGreen");
  console.groupEnd();
  return element;
};

export const HooksFlow = () => {
  console.group("%cParent: render start", "color: MediumSpringGreen");

  const [showChild, setShowChild] = React.useState(() => {
    console.log("%cInside setState Initializer. Run only once!", "color: tomato");
    return false;
  });

  React.useEffect(() => {
    console.log("%cParent: useEffect no dependencies (each time rendered)", "color: LightCoral");
    return () => {
      console.log(
        "%cParent: noDependencies cleanup 🧹",
        "color: LightCoral"
      );
    };
  });

  React.useEffect(() => {
    console.log("%cParent: deps empty (called on first render) ", "color: MediumTurquoise");
    return () => {
      console.log(
        "%cParent: deps empty cleanup 🧹",
        "color: MediumTurquoise"
      );
    };
  }, []);

  React.useEffect(() => {
    console.log("%cParent: showChild is updated", "color: HotPink");
    return () => {
      console.log(
        "%cParent: showChild is updated cleanup 🧹",
        "color: HotPink"
      );
    };
  }, [showChild]);

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={(e) => setShowChild(e.target.checked)}
        />{" "}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: "solid",
        }}
      >
        {showChild ? <Child /> : null}
      </div>
    </>
  );

  console.log("%cParent: render end", "color: MediumSpringGreen");
  console.groupEnd();

  return element;
};
