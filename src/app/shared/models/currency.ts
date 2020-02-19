import { ICurrency } from './icurrency';

export class Currency implements ICurrency {
    constructor(public currency: string) { }
}