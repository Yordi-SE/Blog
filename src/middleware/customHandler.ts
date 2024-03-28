import express from 'express';
import { CustomError } from '../../error/customErrors';
export default (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(err instanceof CustomError) {
      const { statusCode, errors } = err;
      return res.status(statusCode).send({ errors });
    }
    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
  };