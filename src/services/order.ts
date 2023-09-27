import { OrderService as MedusaOrderService, Order } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';

class OrderService extends MedusaOrderService {
  async getOrdersByCustomerId(id: string): Promise<Order[]> {
    const orderRepo = this.activeManager_.getRepository(Order);

    const orders = await orderRepo.find({
      where: {
        customer_id: id
      }
    });

    if (!orders) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Orders were not found');
    }

    return orders;
  }
}

export default OrderService;
