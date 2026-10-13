import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Auth from "./Auth";

jest.mock("axios");

describe("Auth", () => {
  test("sends the values currently typed into the form to the login API", async () => {
    axios.post.mockResolvedValue({
      data: {
        access: "granted",
        user: "admin",
      },
    });

    const { container } = render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    fireEvent.change(container.querySelector('input[name="user-id"]'), {
      target: { value: "a-123" },
    });
    fireEvent.change(container.querySelector('input[name="password"]'), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:5001/auth", {
        username: "a-123",
        password: "12345678",
      });
    });
  });
});
