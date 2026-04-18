import { expect, describe, it, vi } from "vitest";

import { renderWithStore } from "../tests/test-utils";
import { NavigationSettings } from "./NavigationSettings";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("NavigationSettings visibility", () => {
  it("shows settings when hideSetting = false", () => {
    renderWithStore(
      <NavigationSettings onClick={() => {}} hideSetting={false} />,
    );

    expect(screen.getByText("Мова спілкування")).toBeInTheDocument();
  });

  it("does not render language text when hidden", () => {
    const { container } = renderWithStore(
      <NavigationSettings onClick={() => {}} hideSetting={true} />,
    );

    expect(container.querySelector("nav")).toBeInTheDocument();
  });
});

describe("NavigationSettings", () => {
  it("shows specialization after selecting language", async () => {
    const user = userEvent.setup();

    renderWithStore(
      <NavigationSettings onClick={() => {}} hideSetting={false} />,
    );

    expect(screen.queryByText("Спеціалізація")).not.toBeInTheDocument();

    const languageSelect = document.getElementById(
      "language",
    ) as HTMLSelectElement;

    await user.selectOptions(languageSelect, "en-US");

    expect(screen.getByText("Спеціалізація")).toBeInTheDocument();
  });

  it("show technology after selecting specialization", async () => {
    const user = userEvent.setup();

    renderWithStore(
      <NavigationSettings onClick={() => {}} hideSetting={false} />,
    );

    expect(screen.queryByText("Технологія")).not.toBeInTheDocument();

    const languageSelect = document.getElementById(
      "language",
    ) as HTMLSelectElement;
    await user.selectOptions(languageSelect, "en-US");

    const specializationSelect = document.getElementById(
      "specialization",
    ) as HTMLSelectElement;
    await user.selectOptions(specializationSelect, "frontend");

    expect(screen.getByText("Технологія")).toBeInTheDocument();
  });

  it("shows question count after selecting technology", async () => {
    const user = userEvent.setup();

    renderWithStore(
      <NavigationSettings onClick={() => {}} hideSetting={false} />,
    );

    // 1. question count hidden initially
    expect(screen.queryByText("Кількість запитань")).not.toBeInTheDocument();

    // 2. select language
    const languageSelect = document.getElementById(
      "language",
    ) as HTMLSelectElement;
    await user.selectOptions(languageSelect, "en-US");

    // 3. select specialization
    const specializationSelect = document.getElementById(
      "specialization",
    ) as HTMLSelectElement;
    await user.selectOptions(specializationSelect, "frontend");

    // 4. select technology
    const technologySelect = document.getElementById(
      "technology",
    ) as HTMLSelectElement;
    await user.selectOptions(technologySelect, "React");

    // 5. question count appears
    expect(screen.getByText("Кількість запитань")).toBeInTheDocument();
  });

  it("shows start interview button after completing all selections", async () => {
    const user = userEvent.setup();

    renderWithStore(
      <NavigationSettings onClick={() => {}} hideSetting={false} />,
    );

    // button should not exist initially
    expect(
      screen.queryByRole("button", { name: "Почати співбесіду" }),
    ).not.toBeInTheDocument();

    // select language
    await user.selectOptions(
      document.getElementById("language") as HTMLSelectElement,
      "en-US",
    );

    // select specialization
    await user.selectOptions(
      document.getElementById("specialization") as HTMLSelectElement,
      "frontend",
    );

    // select technology
    await user.selectOptions(
      document.getElementById("technology") as HTMLSelectElement,
      "React",
    );

    // select question count
    await user.selectOptions(
      document.getElementById("question-count") as HTMLSelectElement,
      "10",
    );

    // button should appear
    expect(
      screen.getByRole("button", { name: "Почати співбесіду" }),
    ).toBeInTheDocument();
  });
});

describe("NavigationSettings reset logic", () => {
  it("clears technology and question count when specialization changes", async () => {
    const user = userEvent.setup();

    renderWithStore(
      <NavigationSettings onClick={() => {}} hideSetting={false} />,
    );

    // 1. select language
    await user.selectOptions(
      document.getElementById("language") as HTMLSelectElement,
      "en-US",
    );

    // 2. select specialization
    await user.selectOptions(
      document.getElementById("specialization") as HTMLSelectElement,
      "frontend",
    );

    // 3. select technology
    await user.selectOptions(
      document.getElementById("technology") as HTMLSelectElement,
      "React",
    );

    // 4. select question count
    await user.selectOptions(
      document.getElementById("question-count") as HTMLSelectElement,
      "10",
    );

    // sanity check 
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();

    // 5. change specialization → should reset below fields
    await user.selectOptions(
      document.getElementById("specialization") as HTMLSelectElement,
      "backend",
    );

    // 6. VERIFY RESET
    expect(screen.queryByDisplayValue("React")).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("10")).not.toBeInTheDocument();
  });
});