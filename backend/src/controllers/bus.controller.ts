
import { AuthRequest } from '../types/express';
import * as busService from '../services/bus.service';
import { NextFunction, Response } from 'express';
import { storeBusRequest, updateBusRequest } from '../requests/bus.request';
 
export interface Bus {
  name: string,
  fromCityId: number,
  toCityId: number,
  price: number,
  type: string,
  totalSeats: number,
}

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

export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
    try {

        const validated = storeBusRequest.parse(req.body);
        
        const result = await busService.create(validated);
    
        return res.status(201).json({
          status: 'success',
          message: "Bus created",
          data: result,
        });
    } catch (error) {
     next(error);
    }
};

export const update = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const busId = Number(req.body.id);

    const validated = updateBusRequest.parse(req.body);

    const updated = await busService.update({
      id: busId,
      data: validated,
    });

    return res.status(200).json({
      status: 'success',
      message: "Bus updated",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
  const busId = Number(req.params.bus);

    const deleted = await busService.remove(busId);

    return res.status(200).json({
      status: 'success',
      message: "Bus removed",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
}

export const getCity = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);
        const cities = await busService.findCity(id);
    
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
    
        const cities = await busService.findCities(search);
    
        return res.status(200).json(cities);
      } catch (error) {
        next(error);
      }
};

export const getAmenities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const amenities = await busService.getAmenities();

    return res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
}