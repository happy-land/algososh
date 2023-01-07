import { Button } from "./button";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

describe("test button ui-component", () => {
  it("Button without text", () => {
    const buttonWithoutText = renderer.create(<Button />);
    expect(buttonWithoutText).toMatchSnapshot();
  });

  it("button with text", () => {
    const buttonWithText = renderer.create(<Button text="text" />);
    expect(buttonWithText).toMatchSnapshot();
  });

  it("button is disabled", () => {
    const buttonDisabled = renderer.create(<Button disabled={true} />);
    expect(buttonDisabled).toMatchSnapshot();
  });

  it("button is loader", () => {
    const buttonWithLoader = renderer.create(<Button isLoader={true} />);
    expect(buttonWithLoader).toMatchSnapshot();
  });

  describe("button onClick is correctly", () => {
    it("button onClick function executed when clicked", () => {
      const pushMock = jest.fn();

      // Рендерим компонент
      render(<Button onClick={pushMock} text="text for mock" />);

      // Находим элемент кнопки
      const button = screen.getByText("text for mock");

      // Имитируем нажатие на кнопку
      fireEvent.click(button);

      // Проверяем, что pushMock вызвался
      expect(pushMock).toHaveBeenCalled();
    });
  });
});
