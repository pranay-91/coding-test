import Joi from '@hapi/joi';

const payload = Joi.object({
  name: Joi.string().required().description('Name of the payload'),
  valueType: Joi.valid('string', 'array')
    .required()
    .description('Value type can be either string or array and is case-sensitive.'),
  value: Joi.alternatives(Joi.array().items(Joi.link('#payload')), Joi.string())
    .required()
    .description('Value of payload which is either string or link to another payload,'),
});

const transformSchema = Joi.object({
  payload: payload.required().description('Root Payload to be transformed.'),
  referenceData: Joi.object().required().description('Reference data to replace payload, key-value pair.'),
});

export { payload, transformSchema };
