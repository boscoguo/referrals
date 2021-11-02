import httpMethod from "./httpUtils"

describe("httpMethod", () => {

  const data = {
    "givenName": "test",
    "surName": "test name",
    "email": "haha.one@yourcompany.com",
    "phone": "047847976",
    "addressLine": "jokki",
    "suburb": "joigkj",
    "state": "gugiuh",
    "postCode": "7908",
    "country": "alaska"
  }

  it("get should return all referrals as array", async () => {
    const result = await httpMethod.get()
    expect(Array.isArray(result)).toBe(true);
  });

  it("getById success should return the related data", async () => {
    const result = await httpMethod.getById(1);
    expect(Object.prototype.toString.call(result)).toEqual('[object Object]');
  });

  it("getById fail should return null", async () => {
    const result = await httpMethod.getById(55);
    expect(result).toEqual(null);
  });

  it("create success should return the adding data", async () => {
    const result = await httpMethod.create(data);
    expect(result).toEqual(expect.objectContaining(data));
  })

  it("update success should return the object being modified", async () => {
    const result = await httpMethod.update(2, data);
    expect(result).toEqual(expect.objectContaining(data));
  })

  it("delete success should return the deleted data as an object", async () => {
    const result = await httpMethod.delete(5);
    expect(Object.prototype.toString.call(result)).toEqual('[object Object]');
  })
  
})