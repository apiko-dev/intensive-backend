import Ajv from 'ajv';
import fastJson from 'fast-json-stringify';
import errorCodes from 'constants/errorCodes';

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  allErrors: true,
  nullable: true,
  coerceTypes: 'array',
});

const errorCodesSwapped = Object.entries(errorCodes).reduce(
  (acc, [key, value]) => {
    acc[value] = key;

    return acc;
  },
  {},
);

export function checkConstraints(name) {
  const errorName = errorCodesSwapped[name];

  return {
    [errorName]: errorName,
  };
}

export function customSchemaCompiler(schema) {
  return ajv.compile(schema);
}

export function getObjectBySchema(schema, object) {
  const json = fastJson(schema)(object);
  return JSON.parse(json);
}
