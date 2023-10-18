import express, { Router } from 'express';
import {
  ProductRoute,
  OrderRoute,
  AddressesRoute,
  DiscountRoute,
  ProductVariantRoute
} from './routes/store';
import { getConfigFile } from 'medusa-core-utils';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { errorHandler } from '@medusajs/medusa';

export default (rootDirectory) => {
  const router = Router();

  const { configModule } = getConfigFile<ConfigModule>(rootDirectory, 'medusa-config');

  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));

  ProductRoute(router, configModule);
  OrderRoute(router, configModule);
  AddressesRoute(router, configModule);
  DiscountRoute(router, configModule);
  ProductVariantRoute(router, configModule);

  router.use(errorHandler());

  return router;
};
