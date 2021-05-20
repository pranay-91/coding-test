import '../aliases';
import { expect } from 'chai';
import request from 'supertest';
import HttpStatus from 'http-status-codes';
import app from '@/app';
import { goodData, goodTransformedPayload } from '@/test/fixtures';
import * as helper from '@/helper/transform';
import { createSandbox, SinonSandbox } from 'sinon';

/**
 * Functional Unit tests
 */
describe('functional - transform', () => {
  /**
   * Tests for health checks
   */
  describe('Health check', () => {
    it('should return 200 status OK on health check endpoint', async () => {
      const res = await request(app).get('/healthz');
      expect(res.status).to.equal(HttpStatus.OK);
    });
  });

  /**
   * Tests for helper functions
   */
  describe('Helper', () => {
    it('should transform given payload by replacing values with reference data.', () => {
      const transformPayload = { ...goodData.payload };
      helper.transformRecursive(transformPayload, goodData.referenceData);
      expect(transformPayload).to.deep.equal(goodTransformedPayload);
    });
  });

  /**
   * Tests for various routes
   */
  describe('Routes', () => {
    let sandbox: SinonSandbox;
    // before running tests, create a sandbox.
    before(async () => {
      sandbox = createSandbox();
    });

    // after the tests are run, restore or clean the sandbox.
    after(async () => {
      sandbox.restore();
    });

    describe('POST', () => {
      it('should return transformed payload.', async () => {
        const res = await request(app).post('/transform').send(goodData);

        expect(res.status).to.equal(HttpStatus.OK);
        expect(res.body).to.deep.equal(goodTransformedPayload);
      });

      it('should invoke transformRecursive helper method.', async () => {
        // add a stub that acts as a helper transformRecursive transform function
        const getTransformRecursiveStub = sandbox.stub(helper, 'transformRecursive').resolves(goodTransformedPayload);
        const res = await request(app).post('/transform').send(goodData);

        expect(res.status).to.equal(HttpStatus.OK);
        expect(res.body).to.deep.equal(goodTransformedPayload);
        expect(getTransformRecursiveStub.calledOnce).to.equal(true); // helper method should be invokved atleast once.
        expect(getTransformRecursiveStub.calledOnceWith(goodData.payload, goodData.referenceData)).to.equal(true); // helper method should be invoked with correct parameters.
      });

      it('should validate data payload as per schema', async () => {
        const badData = {
          payload: {
            name: 'bad payload',
            value: 'bad value',
          },
        };
        const res = await request(app).post('/transform').send(badData);

        expect(res.status).to.equal(HttpStatus.BAD_REQUEST);
        // should return a validation error with appropriate validation message.
        expect(res.body).to.have.deep.property('reason');
        expect(res.body.reason).to.deep.equal('Validation Error');
        expect(res.body).to.have.deep.property('message');
      });
    });
  });
});
