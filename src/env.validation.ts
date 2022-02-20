import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number().required(),
  DB_PASS: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  PORT: Joi.number(),
  GOOGLE_MAPS_API_KEY: Joi.string().required(),
});
