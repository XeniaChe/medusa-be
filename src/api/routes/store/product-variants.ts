import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';

import { ProductVariantService } from '@medusajs/medusa';
import cors from 'cors';
import { wrapHandler } from '@medusajs/medusa';

type GetWithAttributes = {
  variantId: string;
};

export const ProductVariantRoute = async (router: Router, options: ConfigModule) => {
  const { projectConfig } = options;

  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(','),
    credentials: true
  };

  const prodVarRouter = Router();
  prodVarRouter.use(cors(storeCorsOptions));

  router.use('/store/variants', prodVarRouter);

  prodVarRouter.get(
    '/getWithAttributes/:variantId',
    wrapHandler(async (req, res) => {
      const prodVarService: ProductVariantService = req.scope.resolve('productVariantService');
      const { variantId } = req.params as GetWithAttributes;

      const data = await prodVarService.retrieve(variantId, { relations: ['options.option'] });

      res.json(data);
    })
  );
};
