import {AsyncLocalStorage} from "async_hooks";
import {TokenUserMes} from "../types/common";

export const asyncLocalStorage = new AsyncLocalStorage<{ user: TokenUserMes }>();