import { Cart } from './cart';

export class CartOrders {
    id: number;
    username: string;
    carts: Array<Cart>;
    orderDate: Date;
    deliveryStatus: string;
}
