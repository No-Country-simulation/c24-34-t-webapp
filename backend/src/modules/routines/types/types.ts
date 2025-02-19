import { Period, TimeRange } from "../enums/enums";

export type Period = (typeof Period)[keyof typeof Period];
export type TimeRange = (typeof TimeRange)[keyof typeof TimeRange];
