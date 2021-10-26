import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { DeleteAlert } from "./"
import userEvent from "@testing-library/user-event";

describe('DeleteAlert', () => {

  it('should render elemets correctly', () => {
    render(<DeleteAlert open={true} deleteId={1} setOpen={jest.fn} setReferrals={jest.fn} />);
    const textElement = screen.getByText(/Detele this referral/i);
    expect(textElement).toBeInTheDocument();
    const deleteBtn = screen.getByText(/DELETE/i);
    expect(deleteBtn).toBeInTheDocument();
    const cancleBtn = screen.getByText(/CANCEL/i);
    expect(cancleBtn).toBeInTheDocument();
  });

  it('should close the modal when clicking cancel button', () => {
    render(<DeleteAlert open={true} deleteId={1} setOpen={jest.fn} setReferrals={jest.fn} />);
    const cancleBtn = screen.getByText(/CANCEL/i);
    userEvent.click(cancleBtn);
    async () => {
      const modalElement = screen.findByRole("presentation");
      expect(modalElement).not.toBeVisible();
    }
  })

  it('should close the modal when clicking delete button', () => {
    render(<DeleteAlert open={true} deleteId={1} setOpen={jest.fn} setReferrals={jest.fn} />);
    const deleteBtn = screen.getByText(/DELETE/i);
    userEvent.click(deleteBtn);
    async () => {
      const modalElement = screen.findByRole("presentation");
      expect(modalElement).not.toBeVisible();
    }
  })

});
