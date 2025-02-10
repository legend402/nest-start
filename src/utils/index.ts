import { Request } from "express";
import {TOKEN_KEY} from "../constants";
import {Like} from "typeorm";
import {TokenUserMes} from "../types/common";

export const getFileInfo = (file: Express.Multer.File) => {
  return {
    originalName: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    size: file.size,
    destination: file.destination,
    filename: file.filename,
    path: file.path,
    buffer: file.buffer,
  };
}

export const getToken = (req: Request) => {
  return req.header(TOKEN_KEY);
}

export function getRequestTokenUser(req: Request) {
  return req.user as TokenUserMes;
}

export function safeLike(str: string) {
  return str ? Like(`%${str}%`) : undefined;
}
