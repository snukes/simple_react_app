import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import Navbar from '@/components/navbar/navbar'

afterEach(() => {
  cleanup();
})

describe('Navbar', () => {

  render(<Navbar />);
  const link = screen.getByTestId("about-link");

  it('renders a Navbar', () => {
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("About");
  })
})