import { Circle } from "./circle";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe("test circle ui-component", () => {
  it("circle without text", () => {
    const circleWithoutText = renderer.create(<Circle />);
    expect(circleWithoutText).toMatchSnapshot();
  });

  it("circle with text", () => {
    const circleWithText = renderer.create(<Circle letter="letter" />);
    expect(circleWithText).toMatchSnapshot();
  });

  it("circle with head", () => {
    const circleWithHead = renderer.create(<Circle head="head" />);
    expect(circleWithHead).toMatchSnapshot();
  });

  it("circle with react-element in head", () => {
    const circleWithReactElHead = renderer.create(<Circle head={<Circle />} />);
    expect(circleWithReactElHead).toMatchSnapshot();
  });

  it("circle with tail", () => {
    const circleWithTail = renderer.create(<Circle tail="tail" />);
    expect(circleWithTail).toMatchSnapshot();
  });

  it("circle with react-element in tail", () => {
    const circleWithReactElTail = renderer.create(<Circle tail={<Circle />} />);
    expect(circleWithReactElTail).toMatchSnapshot();
  });

  it("circle with index", () => {
    const circleWithIndex = renderer.create(<Circle index={0} />);
    expect(circleWithIndex).toMatchSnapshot();
  });

  it("circle with props isSmall", () => {
    const circleWithIsSmall = renderer.create(<Circle isSmall={true} />);
    expect(circleWithIsSmall).toMatchSnapshot();
  });

  it("circle with state default", () => {
    const circleDefault = renderer.create(
      <Circle state={ElementStates.Default} />
    );
    expect(circleDefault).toMatchSnapshot();
  });

  it("circle with state modified", () => {
    const circleModified = renderer.create(
      <Circle state={ElementStates.Modified} />
    );
    expect(circleModified).toMatchSnapshot();
  });

  it("circle with state changing", () => {
    const circleChanging = renderer.create(
      <Circle state={ElementStates.Changing} />
    );
    expect(circleChanging).toMatchSnapshot();
  });
});
