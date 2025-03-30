import { Request } from "express"

export interface RequestCustom extends Request {
    clientId: string,
    identifier: string
}