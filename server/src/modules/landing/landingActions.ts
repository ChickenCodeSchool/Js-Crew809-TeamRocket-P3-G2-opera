import landingRepository from "./landingRepository";
import type { RequestHandler } from "express";

const browseBackgrounds : RequestHandler = async (req,res, next) => {
    try {
        const backgrounds = await landingRepository.getBackgrounds();
        res.json(backgrounds);
    } catch (err){
        next(err)
    };
};

export default {browseBackgrounds}