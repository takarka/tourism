import { User } from './user';

export class PersonData {
  constructor(
    public user?: User,
    public salary?: string,
    public education?: number,
    public job?: string,
    public position?: string,
    public family_status?: number,
    public kids?: number
  ) {}
}
