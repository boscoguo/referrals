import * as request from 'supertest';
import app from '../';

describe('Referrals API', () => {

  const data = {
    "givenName": "ba",
    "surName": "Lu",
    "email": "another.one@yourcompany.com",
    "phone": "0478456456",
    "addressLine": "joijoi",
    "suburb": "joijoi",
    "state": "gugiuh",
    "postCode": "oihoih",
    "country": "jhghjg"
  }

  const updatedData = {
    "givenName": "baNew",
    "surName": "LuNew",
    "email": "111.one@yourcompany.com",
    "phone": "0490656456",
    "addressLine": "joijoi",
    "suburb": "joijoi",
    "state": "gugiuh",
    "postCode": "57868",
    "country": "jhghjg"
  }

  it('get should return all referrals as array', async () => {
    const result = await request(app).get('/referrals');

    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it('getByID should return related referral as an object', async() => {
    const result = await request(app).get('/referrals/2');

    expect(result.status).toEqual(200);
    expect(Object.prototype.toString.call(result.body)).toEqual('[object Object]');
  })

  it('post should return related referral that add data as an object', async() => {
    const result = await request(app).post('/referrals').send(data);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(expect.objectContaining(data));
  })

  it('put should return the updated data as an object', async () => {
    const result = await request(app).put("/referrals/1").send(updatedData);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(expect.objectContaining(updatedData));
  })

  it('delete should return the related data that request to be delete', async () => {
    const result = await request(app).delete("/referrals/3");
    expect(result.status).toEqual(200);
    expect(Object.prototype.toString.call(result.body)).toEqual('[object Object]');
  })
  
});
