import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AvatarStack } from "../avatar-stack";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("AvatarStack Atom", () => {
  const mockImages = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];

  it("renders at most 3 images", () => {
    render(<AvatarStack images={mockImages} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute("src", "/img1.jpg");
    expect(images[2]).toHaveAttribute("src", "/img3.jpg");
  });

  it("shows remaining count when provided and positive", () => {
    render(<AvatarStack images={mockImages} remainingCount={5} />);
    expect(screen.getByText("+5")).toBeInTheDocument();
  });

  it("does not show remaining count if 0 or undefined", () => {
    const { rerender } = render(<AvatarStack images={mockImages} remainingCount={0} />);
    expect(screen.queryByText("+0")).not.toBeInTheDocument();

    rerender(<AvatarStack images={mockImages} />);
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<AvatarStack images={mockImages} size="sm" />);
    // Since we're testing the container of the image
    const containers = screen.getAllByRole("img").map(img => img.parentElement);
    expect(containers[0]).toHaveClass("w-8 h-8");

    rerender(<AvatarStack images={mockImages} size="md" />);
    const updatedContainers = screen.getAllByRole("img").map(img => img.parentElement);
    expect(updatedContainers[0]).toHaveClass("w-10 h-10");
  });

  it("merges custom className", () => {
    render(<AvatarStack images={mockImages} className="custom-stack" />);
    // The main container
    const stack = screen.getAllByRole("img")[0].parentElement?.parentElement;
    expect(stack).toHaveClass("custom-stack");
  });
});
