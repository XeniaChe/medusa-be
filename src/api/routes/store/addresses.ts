import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import AdressService from '../../../services/address';
import cors from 'cors';
import { wrapHandler } from '@medusajs/medusa';
import { AddressDraft } from '../../../types';

type GetAddressesQueryParams = {
  customerId: string;
};

type AddNewBody = {
  customerId: string;
  address: AddressDraft;
};

type UpdateBody = {
  customerId: string;
  addressId: string;
  address: AddressDraft;
};

export const AddressesRoute = async (router: Router, options: ConfigModule) => {
  const { projectConfig } = options;

  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(','),
    credentials: true
  };

  const addressRouter = Router();
  addressRouter.use(cors(storeCorsOptions));

  router.use('/store/addresses', addressRouter);

  addressRouter.get(
    '/getByCustomerId',
    wrapHandler(async (req, res) => {
      const addressService: AdressService = req.scope.resolve('addressService');

      const { customerId } = req.query as GetAddressesQueryParams;

      const data = await addressService.list(customerId);

      res.json(data);
    })
  );

  addressRouter.post(
    '/addToCustomer',
    wrapHandler(async (req, res) => {
      const addressService: AdressService = req.scope.resolve('addressService');
      const { customerId, address } = req.body as AddNewBody;

      const data = await addressService.addToCustomer(customerId, address);

      res.json(data);
    })
  );

  addressRouter.put(
    '/update',
    wrapHandler(async (req, res) => {
      const addressService: AdressService = req.scope.resolve('addressService');
      const { customerId, address, addressId } = req.body as UpdateBody;

      const data = await addressService.update(customerId, addressId, address);

      res.json(data);
    })
  );

  addressRouter.delete(
    '/:id',
    wrapHandler(async (req, res) => {
      const addressService: AdressService = req.scope.resolve('addressService');
      const { customerId } = req.body as UpdateBody;
      const { id } = req.params;

      const data = await addressService.remove(customerId, id);

      res.json(data);
    })
  );
};
