import { StringComponent } from "./string";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

describe("test string component", () => {
  const reverseStringTest = (initStr, reversedStr) => {
    return async () => {
      render(
        <Router>
          <StringComponent />
        </Router>
      );

      const inputValue = screen.getByRole("textbox");
      userEvent.type(inputValue, initStr);

      const reverseButton = screen.getByTestId("button");

      fireEvent.click(reverseButton);

      await waitFor(
        () => () => {
          expect(screen.getByRole(".circlesWrapper").textContent).toBe(
            reversedStr
          );
        },
        { timeout: 10000 }
      );
    };
  };
  it("with an even number of symbols", reverseStringTest("123456", "654321"));
  it("with an odd number of symbols", reverseStringTest("12345", "54321"));
  it("with empty string", () => {
    render(
      <Router>
        <StringComponent />
      </Router>
    );
    const initStr = "";

    const inputValue = screen.getByTestId("test-input");
    const reverseButton = screen.queryByTestId("button");

    fireEvent.change(inputValue, { target: { value: initStr } });
    fireEvent.click(reverseButton);

    expect(screen.queryByRole(".circlesWrapper")).not.toBeInTheDocument();
  });

  it("with one symbol", async () => {
    render(
      <Router>
        <StringComponent />
      </Router>
    );
    const initStr = "3";
    const expStr = ["3"];

    const input = screen.getByTestId("test-input");
    const reverseButton = screen.queryByTestId("button");

    userEvent.type(input, initStr);
    fireEvent.click(reverseButton);

    const result = screen
      .queryAllByTestId("test-circle_value")
      .map((i) => i.textContent);

    expect(expStr).toEqual(result);
  });
});
