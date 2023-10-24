import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import ProductService from '../../../services/product';
import cors from 'cors';
import { wrapHandler } from '@medusajs/medusa';

type GetBySlugQueryParams = {
  slug: string;
};

type GetByKeywordQueryParams = {
  key: string;
};

export const ProductRoute = async (router: Router, options: ConfigModule) => {
  const { projectConfig } = options;

  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(','),
    credentials: true
  };

  const prodRouter = Router();
  prodRouter.use(cors(storeCorsOptions));

  router.use('/store/products', prodRouter);

  // TODO: remove. No intervantions into original entities/DB schema ath the moment
  /*   prodRouter.get(
    '/getBySlug',
    wrapHandler(async (req, res) => {
      const prodService: ProductService = req.scope.resolve('productService');
      const { slug } = req.query as GetBySlugQueryParams;

      const data = await prodService.getProductsBySlug(slug);

      res.json(data);
    })
  ); */

  prodRouter.get(
    '/getByKeyword',
    wrapHandler(async (req, res) => {
      const prodService: ProductService = req.scope.resolve('productService');
      const { key } = req.query as GetByKeywordQueryParams;

      const data = await prodService.getProductByKeyword(key);

      res.json(data);
    })
  );

  prodRouter.get(
    '/getBySlug',
    wrapHandler(async (req, res) => {
      const prodService: ProductService = req.scope.resolve('productService');
      const { slug } = req.query as GetBySlugQueryParams;

      const data = await prodService.getProductsBySlug(slug);
      console.log({data});

      res.json(data);
    })
  );

};
