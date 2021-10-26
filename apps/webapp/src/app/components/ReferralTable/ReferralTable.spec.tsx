import React from 'react';
import { getByText, render, waitFor, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { Referral } from '../../types/referral';
import { ReferralTable } from './ReferralTable';
import userEvent from "@testing-library/user-event";

describe('ReferralTable', () => {

  const testReferrals: Referral[] = [
    {
      id: 1,
      givenName: 'John',
      surName: 'Doe',
      phone: '0456 123123',
      email: 'testing@brighte.com.au',
      addressLine: 'test address',
      suburb: 'wanyi',
      state: 'nsw',
      postCode: '21234',
      country: 'Aus'
    },
    {
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
    },
  ];

  it('should render headers correctly', async () => {
    const { baseElement } = render(<ReferralTable referrals={[]} setReferrals={jest.fn}/>);
    await waitFor(() => getByText(baseElement as HTMLElement, 'Given Name'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Surname'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Email'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Phone'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Address Line'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Suburb'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'State'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Post Code'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Country'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Actions'));
  });

  it('should render referral fields', async () => {
    const { baseElement } = render(<ReferralTable referrals={testReferrals} setReferrals={jest.fn}/>);
    await waitFor(() => getByText(baseElement as HTMLElement, 'John'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Doe'));
    await waitFor(() => getByText(baseElement as HTMLElement, '0456 123123'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'testing@brighte.com.au'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'test address'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'wanyi'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'nsw'));
    await waitFor(() => getByText(baseElement as HTMLElement, '21234'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Aus'));

    await waitFor(() => getByText(baseElement as HTMLElement, 'Another'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Referral'));
    await waitFor(() => getByText(baseElement as HTMLElement, '0456 345345'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'referral@gmail.com'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'test address1'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'waner'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'vic'));
    await waitFor(() => getByText(baseElement as HTMLElement, '21334'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Aussia'));
  });

  it('should open delete modal when clicking delete button', async () => {
    render(<ReferralTable referrals={testReferrals} setReferrals={jest.fn}/>)
    const deleteBtns = screen.getAllByTestId("delete-btn")
    deleteBtns.forEach(deleteBtn => {
      userEvent.click(deleteBtn);
      async () => {
        const modalNode = await screen.findByText(/Are you sure/i);
        expect(modalNode).toBeInTheDocument();
      };
    })
  })

  it('should open edit modal when clicking edit button', async () => {
    render(<ReferralTable referrals={testReferrals} setReferrals={jest.fn}/>)
    const editBtns = screen.getAllByTestId("edit-btn")
    editBtns.forEach(editBtn => {
      userEvent.click(editBtn);
      async () => {
        const modalNode = await screen.findByText(/Save/i);
        expect(modalNode).toBeInTheDocument();
      };
    })
  })

  it('should open add modal when clicking add button', async () => {
    render(<ReferralTable referrals={testReferrals} setReferrals={jest.fn}/>)
    const addBtn = screen.getByTestId("add-btn")
    userEvent.click(addBtn);
    async () => {
      const modalNode = await screen.findByText(/Create/i);
      expect(modalNode).toBeInTheDocument();
    };
  })

});
