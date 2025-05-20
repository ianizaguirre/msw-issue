import { render, screen, fireEvent, act } from "@testing-library/react";
import SampleForm from "../components/SampleForm";
import "@testing-library/jest-dom";

test("submits form with name", async () => {
  render(<SampleForm />);

  // Wait for the first and last name to be set by the useEffect fetch
  const firstName = await screen.findByText("John");
  const lastName = await screen.findByText("Maverick");

  // Assert that the correct names are rendered
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
});
