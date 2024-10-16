import LoginPage from "../../../app/[[...sign-in]]/page";
import React from "react";
import { render, screen } from "@testing-library/react";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/router";

// Mock do hook useUser do Clerk
jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

// Mock do Next.js useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    // Mock para o hook useUser
    (useUser as jest.Mock).mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    });

    // Mock para o hook useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(), // Simula a função push do roteador
      prefetch: jest.fn(), // Simula prefetch
    });
  });

  it("deve renderizar o componente de login corretamente", () => {
    render(<LoginPage />);

    // Verifica se o logo e os campos de login estão na tela
    expect(screen.getByText("Sistema Escolar VB")).toBeInTheDocument();
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
  });

  it("não deve redirecionar se o usuário não estiver logado", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<LoginPage />);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("deve redirecionar com base na role do usuário quando logado", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Mock do usuário logado com role "admin"
    (useUser as jest.Mock).mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: { publicMetadata: { role: "admin" } },
    });

    render(<LoginPage />);

    expect(mockPush).toHaveBeenCalledWith("/admin");
  });
});
