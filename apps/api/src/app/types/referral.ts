export interface IrequestParams {
  id?: number 
}

export interface IupdatedReferral {
  id?: number;
  givenName?: string;
  surName?: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  suburb?: string;
  state?: string;
  postCode?: string;
  country?: string;
}