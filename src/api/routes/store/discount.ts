import { Router } from 'express';
import DiscountService from '../../../services/discount';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import cors from 'cors';
import { wrapHandler } from '@medusajs/medusa';

enum DiscountRuleType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping'
}

enum AllocationType {
  TOTAL = 'total',
  ITEM = 'item'
}

type CreateDiscount = {
  discountDraft: {
    code: string;
    rule: { type: DiscountRuleType; value: number; allocation: AllocationType };
    is_dynamic: boolean;
    is_disabled: boolean;
  };
  regionId: string;
};

export const DiscountRoute = async (router: Router, options: ConfigModule) => {
  const { projectConfig } = options;

  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(','),
    credentials: true
  };

  const discountRouter = Router();
  discountRouter.use(cors(storeCorsOptions));

  router.use('/store/discounts', discountRouter);

  discountRouter.post(
    '/add',
    wrapHandler(async (req, res) => {
      const discountService: DiscountService = req.scope.resolve('discountService');
      const { discountDraft, regionId } = req.body as CreateDiscount;

      const data = await discountService.createDiscount(discountDraft, regionId);

      res.json(data);
    })
  );

  discountRouter.get('/getAll',  wrapHandler(async (req, res) => {
    const discountService: DiscountService = req.scope.resolve('discountService');
    const data = await discountService.list({},{ relations: ['regions'] } )

    res.json(data);
  }))
};
