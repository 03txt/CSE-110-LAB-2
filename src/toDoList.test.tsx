import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";


  test("renders all items", () => {
    render(<ToDoList />);
    const items = screen.getAllByRole("checkbox");
    expect(items.length).toBe(dummyGroceryList.length); // Assuming dummyGroceryList is your list
  });

  test("updates item checked status and remaining count", () => {
    render(<ToDoList />);

    const firstItemCheckbox = screen.getByLabelText(dummyGroceryList[0].name);
    fireEvent.click(firstItemCheckbox);

    const remainingCount = screen.getByText(/Items bought: 1/); //first check off
    expect(remainingCount).toBeInTheDocument();

    const secondItemCheckbox = screen.getByLabelText(dummyGroceryList[1].name); //second check off
    fireEvent.click(secondItemCheckbox);

    const updatedCount = screen.getByText(/Items bought: 2/);
    expect(updatedCount).toBeInTheDocument();

    fireEvent.click(firstItemCheckbox); // Uncheck
    const finalCount = screen.getByText(/Items bought: 1/);
    expect(finalCount).toBeInTheDocument();
  });


