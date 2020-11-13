import { Grocery } from './grocery';

export interface TeamProfile {
    id: string;
    teamAdmin: string;
    groceryList: Grocery[];
}
