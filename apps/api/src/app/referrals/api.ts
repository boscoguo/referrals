import { Request, Response } from 'express';
import prisma from '../prisma';
import { IrequestParams, IupdatedReferral } from '../types/referral';

export const getAllReferrals = async (req: Request, res: Response) => {
  const referrals = await prisma.referral.findMany();

  res.json(referrals);
};

export const getReferralById = async (req: Request, res: Response) => {
  const { id }: IrequestParams = req.params;
  const referral = await prisma.referral.findUnique({
    where: { id: Number(id) },
  });

  res.json(referral);
};

export const creatReferral = async (req: Request, res: Response) => {
  const { givenName, surName, email, phone, addressLine, suburb, state, postCode, country }: IupdatedReferral = req.body
  const newReferral = await prisma.referral.create({
    data: {
      givenName: givenName, 
      surName: surName, 
      email: email, 
      phone: phone, 
      addressLine: addressLine, 
      suburb: suburb, 
      state: state, 
      postCode: postCode, 
      country: country
    }
  })
  res.json(newReferral)
}

export const updateReferralById = async (req: Request, res: Response) => {
  const { id }: IrequestParams = req.params;
  const { givenName, surName, email, phone, addressLine, suburb, state, postCode, country }: IupdatedReferral = req.body
  const updatedReferral = await prisma.referral.update({
    where: {
      id: Number(id),
    },
    data: {
      givenName: givenName, 
      surName: surName, 
      email: email, 
      phone: phone, 
      addressLine: addressLine, 
      suburb: suburb, 
      state: state, 
      postCode: postCode, 
      country: country
    }
  });

  res.json(updatedReferral);
}

export const deleteReferralById = async (req: Request, res: Response) => {
  const { id }: IrequestParams = req.params;
  const deletedReferral = await prisma.referral.delete({
    where: { id: Number(id) },
  });

  res.json(deletedReferral);
};
