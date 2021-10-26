import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { SubmitForm } from "./"
import userEvent from "@testing-library/user-event";


describe('DeleteAlert', () => {

  const updateResult = {
    id: 2,
    givenName: 'Another',
    surName: 'Referral',
    phone: '0456 345345',
    email: 'referral@gmail.com',
    addressLine: 'test address1',
    suburb: 'waner',
    state: 'vic',
    postCode: '21334',
    country: 'Aussia'
  }

  const emptyUpdatedResult = {
    id: 3,
    givenName: '',
    surName: '',
    phone: '',
    email: '',
    addressLine: '',
    suburb: '',
    state: '',
    postCode: '',
    country: ''
  }

  it('should render elemets correctly', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={updateResult}/>);
    const givenNameElement = screen.getByDisplayValue("Another");
    expect(givenNameElement).toBeInTheDocument();
    const surNameElement = screen.getByDisplayValue("Referral");
    expect(surNameElement).toBeInTheDocument();
    const phoneElement = screen.getByDisplayValue("0456 345345");
    expect(phoneElement).toBeInTheDocument();
    const emailElement = screen.getByDisplayValue("referral@gmail.com");
    expect(emailElement).toBeInTheDocument();
    const addressLineElement = screen.getByDisplayValue("test address1");
    expect(addressLineElement).toBeInTheDocument();
    const suburbElement = screen.getByDisplayValue("waner");
    expect(suburbElement).toBeInTheDocument();
    const stateElement = screen.getByDisplayValue("vic");
    expect(stateElement).toBeInTheDocument();
    const postCodeElement = screen.getByDisplayValue("21334");
    expect(postCodeElement).toBeInTheDocument();
    const countryElement = screen.getByDisplayValue("Aussia");
    expect(countryElement).toBeInTheDocument();
    const saveBtn = screen.getByText("Save");
    expect(saveBtn).toBeInTheDocument();
    const cancleBtn = screen.getByText("Cancel");
    expect(cancleBtn).toBeInTheDocument();
  });

  it('should close the modal when clicking cancel button', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={updateResult}/>);
    const cancleBtn = screen.getByText("Cancel");
    userEvent.click(cancleBtn);
    async () => {
      const modalElement = screen.findByRole("presentation");
      expect(modalElement).not.toBeVisible();
    }
  })

  it('should close the modal when submitting successful', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={updateResult}/>);
    const saveBtn = screen.getByText("Save");
    userEvent.click(saveBtn);
    async () => {
      const modalElement = screen.findByRole("presentation");
      expect(modalElement).not.toBeVisible();
    }
  })

  it('should hint users when submitting unsuccessful', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={emptyUpdatedResult} />);
    const saveBtn = screen.getByText("Save");
    userEvent.click(saveBtn);
    async () => {
      const errorElements = screen.findAllByText("Requiered");
      expect(errorElements).toHaveLength(9);
      const modalElement = screen.findByRole("presentation");
      expect(modalElement).toBeVisible();
    }
  })

  it('should hint users when email format is incorrect', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={updateResult} />);
    const emailElement = screen.getByDisplayValue("referral@gmail.com");
    userEvent.clear(emailElement);
    userEvent.type(emailElement, "adb");
    expect(emailElement).toHaveValue("adb");
    async () => {
      const emailErrorMessageNode = await screen.findByText("Invalid email");
      expect(emailErrorMessageNode).toBeInTheDocument();
    };
  })

  it('should hint users when phone field input is not number', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={updateResult} />);
    const phoneElement = screen.getByDisplayValue("0456 345345");
    userEvent.clear(phoneElement);
    userEvent.type(phoneElement, "adb");
    expect(phoneElement).toHaveValue("adb");
    async () => {
      const phoneErrorMessageNode = await screen.findByText("Must be only digits");
      expect(phoneErrorMessageNode).toBeInTheDocument();
    };
  })

  it('should hint users when phone number is too long', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={updateResult} />);
    const phoneElement = screen.getByDisplayValue("0456 345345");
    userEvent.clear(phoneElement);
    userEvent.type(phoneElement, "123456543454543");
    expect(phoneElement).toHaveValue("123456543454543");
    async () => {
      const phoneErrorMessageNode = await screen.findByText("Too Long !");
      expect(phoneErrorMessageNode).toBeInTheDocument();
    };
  })

  it('should hint users when phone number is too short', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={updateResult} />);
    const phoneElement = screen.getByDisplayValue("0456 345345");
    userEvent.clear(phoneElement);
    userEvent.type(phoneElement, "12345");
    expect(phoneElement).toHaveValue("12345");
    async () => {
      const phoneErrorMessageNode = await screen.findByText("Too Short !");
      expect(phoneErrorMessageNode).toBeInTheDocument();
    };
  })

  it('should hint users when post code field input is not number', () => {
    render(<SubmitForm updateId={1} setOpen={jest.fn} setReferrals={jest.fn} updateResult={updateResult} />);
    const postCodeElement = screen.getByDisplayValue("21334");
    userEvent.clear(postCodeElement);
    userEvent.type(postCodeElement, "12345");
    expect(postCodeElement).toHaveValue("12345");
    async () => {
      const postErrorMessageNode = await screen.findByText("Must be only digits");
      expect(postErrorMessageNode).toBeInTheDocument();
    };
  })
  
  it('should render create templete when clicking create button', () => {
    render(<SubmitForm updateId={0} setOpen={jest.fn} setReferrals={jest.fn} updateResult={emptyUpdatedResult} />);
    const createBtn = screen.getByText("Create");
    expect(createBtn).toBeInTheDocument();
  })

});
