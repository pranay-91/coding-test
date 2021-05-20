import { expect } from 'chai';
import request from 'supertest';
import HttpStatus from 'http-status-codes';
import app from '../app';
import { goodData, goodTransformedPayload } from '../test/fixtures';
import transformRecursive from '../helper/transform';

describe('functional - transform', () => {
  describe('Helper', () => {
    it('should transform given payload by replacing values with reference data.', () => {
      const transformPayload = { ...goodData.payload };
      transformRecursive(transformPayload, goodData.referenceData);
      expect(transformPayload).to.deep.equal(goodTransformedPayload);
    });
  });

  describe('POST', () => {
    it('should return transformed payload.', async () => {
      const res = await request(app).post('/transform').send(goodData);
      expect(res.status).to.equal(HttpStatus.OK);
      expect(res.body).to.deep.equal(goodTransformedPayload);
    });
  });
});
