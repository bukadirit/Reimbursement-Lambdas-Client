import { Attributes, AttributeForm } from './user';

export interface ReimbInterface {
  id: number;
  amount: number;
  timeSubmitted: Date;
  timeResolved: Date;
  description: string;
  receipt: string;
  status: string;
  type: string;
  authorId: string;
  authorDetails: AttributeForm;
  resolverId: string;
  resolverDetails: AttributeForm;
}

export class Reimbursement {
  constructor(
    public id?: number,
    public amount?: number,
    public timeSubmitted?: Date,
    public timeResolved?: Date,
    public description?: string,
    public receipt?: string,
    public status?: string,
    public type?: string,
    public authorId?: string,
    public authorDetails?: Attributes,
    public resolverId?: string,
    public resolverDetails?: Attributes
  ) {}
}
