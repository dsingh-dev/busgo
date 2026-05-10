
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/express';
import * as cityService from '../services/city.service';
import * as busService from '../services/bus.service';


export const index = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
    try {
        const result = await busService.index(req.query);
    
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const getCity = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);
        const cities = await cityService.findCity(id);
    
        return res.status(200).json(cities);
      } catch (error) {
        next(error);
      }
}

export const getAllCities = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const search =
          typeof req.query.search === "string" ? req.query.search : "";
    
        const cities = await cityService.findCities(search);
    
        return res.status(200).json(cities);
      } catch (error) {
        next(error);
      }
};