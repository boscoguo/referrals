import { lowerCaseAndRemoveSpace } from "./lowerCaseAndRemoveSpaceUtils";

describe ("lowerCaseAndRemoveSpace", () => {
  const feildsArr = ["Given Name", "Surname", "Email", "Phone", "Address Line", "Suburb", "State", "Post Code", "Country"]

  it('shoul low case the first letter and remove space', () => {
    expect(lowerCaseAndRemoveSpace(feildsArr))
      .toEqual(['givenName', 'surName', 'email', 'phone', 'addressLine', 'suburb', 'state', 'postCode', 'country']);
    
  })
})