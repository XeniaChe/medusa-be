import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import OrderService from '../../../services/order';
import cors from 'cors';
import { wrapHandler } from '@medusajs/medusa';

type GetByCustomerId = {
  id: string;
};

export const OrderRoute = async (router: Router, options: ConfigModule) => {
  const { projectConfig } = options;

  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(','),
    credentials: true
  };

  const orderRouter = Router();
  orderRouter.use(cors(storeCorsOptions));

  router.use('/store/orders', orderRouter);

  orderRouter.get(
    '/getOrdersByCustometId',
    wrapHandler(async (req, res) => {
      const orderService: OrderService = req.scope.resolve('orderService');
      const { id } = req.query as GetByCustomerId;

      const data = await orderService.getOrdersByCustomerId(id);
      res.json(data);
    })
  );
};
