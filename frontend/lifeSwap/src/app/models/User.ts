import {Routine} from './routine';

export interface User {
  id: string
  username: string,
  email: string,
  routines: Routine[],
  accessToken: string,
  assignedRoutine:string
}
export interface SignIn {
  email: string,
  password: string
}
