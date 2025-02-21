import { Period } from "../enums/period.enum";
import { TimeRange } from "../enums/time-range.enum";

export type Period = (typeof Period)[keyof typeof Period];
export type TimeRange = (typeof TimeRange)[keyof typeof TimeRange];
