import { User } from "./user";

export interface ReimbInterface{
    id: number,
    amount: number,
    timeSubmitted: Date,
    timeResolved: Date,
    description: string,
    receipt: string,
    status: string,
    type: string,
    author: User,
    resolver: User
}


export class Reimbursement{

    constructor(
        public id?: number,
        public amount?: number,
        public timeSubmitted?: Date,
        public timeResolved?: Date,
        public description?: string,
        public receipt?: string,
        public status?: string,
        public type?: string,
        public author?: User,
        public resolver?: User){};
}