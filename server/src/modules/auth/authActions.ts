import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import customerRepository from "../user/customerRepository";

interface MyPayload{
    sub:string;
}

const SALT_ROUNDS = 10;

const login: RequestHandler = async (req, res, next) => {
    try {
        const customer = await customerRepository.readByEmailWithPassword(req.body.mail);
        if (customer === null){
            res.sendStatus(422)
            return;
        }
        const verified = await bcrypt.compare(
            req.body.password,
            customer.password,
        );

        if (verified) {
            const {password, ...customerWhitoutHashedPassword} = customer;

            const payload:  MyPayload = {
                sub : customer.customer_id.toString()
            };
            const token = jwt.sign(
                payload,
                process.env.APP_SECRET as string,
                {
                    expiresIn: "1h",
                },
            );
            res.json({
                token,  
                customer:  customerWhitoutHashedPassword,
            });
        } else {
            res.sendStatus(422);
        }
    } catch (err) {
        next(err);
    }
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      res.status(400).json({ error: "Password is required" });
      return; 
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req,  res , next) => {
    try {
        const authorizationHeader = req.get("Authorization");
        if (!authorizationHeader) { 
        res.sendStatus(401);
        return;
    }
        const [type, token] = authorizationHeader.split(" ");

        if (type !== "Bearer"){
            throw new Error("Authorization header has not the 'Bearer' type");
        }
        req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;
        next ();
    } catch(err) {
        console.error(err);
        res.sendStatus(401);
    }
};

export default {login, hashPassword,  verifyToken}