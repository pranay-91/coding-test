import { Payload, Data } from '../types/shared';

/**
 * A recursive function which traverses a payload (JSON Object) and replaces value with reference data.
 * @param payload - payload to be transformed
 * @param referenceData - reference data to replace fields
 */
const transformRecursive = (payload: Payload, referenceData: Data['refenceData']): void => {
  for (const property in payload) {
    if (typeof payload[property] === 'object') {
      transformRecursive(payload[property], referenceData);
    } else {
      if (typeof payload[property] === 'string') {
        for (const ref in referenceData) {
          const replace = `{${ref}}`;
          const regex = new RegExp(replace, 'g');
          payload[property] = payload[property].replace(regex, referenceData[ref]);
        }
      }
    }
  }
};
export { transformRecursive };
