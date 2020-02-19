import { IProduct } from './iproduct';

export class Product implements IProduct {
    constructor ( public id: string, public name: string, public imageUrl: string, public price: number) { }
}
