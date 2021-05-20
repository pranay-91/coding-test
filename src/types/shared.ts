// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSONObject = Record<string, any>;

export interface Payload extends JSONObject {
  name: string;
  valueType: string;
  value: Payload[] | string;
}

export interface Data extends JSONObject {
  payload: Payload;
  refenceData: JSONObject;
}
