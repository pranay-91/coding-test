import { Payload, Data } from '../types/shared';

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
