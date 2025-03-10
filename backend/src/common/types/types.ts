import { Period } from "../enums/period.enum";

export type Period = (typeof Period)[keyof typeof Period];
export { AuthTokenRequest } from "./auth-token-request.type";
export { ValueOf } from "./value-of.type";
