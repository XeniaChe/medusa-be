import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import AdressService from '../../../services/address';
import cors from 'cors';
import { wrapHandler } from '@medusajs/medusa';
import { AddressDraft } from '../../../types';

type GetAddressesQueryParams = {
  customerId: string;
};

type GetByIdADdressParams = {
  customerId: string;
  addressId: string;
};

type AddNewAddressBody = {
  customerId: string;
  address: AddressDraft;
};

type UpdateAddressBody = {
  /*   customerId: string;
  addressId: string;
 */
  address: AddressDraft;
};

type RemoveAddressBody = {
  customerId: string;
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
      const { customerId, address } = req.body as AddNewAddressBody;

      const data = await addressService.addToCustomer(customerId, address);

      res.json(data);
    })
  );

  addressRouter.put(
    '/update',
    wrapHandler(async (req, res) => {
      const addressService: AdressService = req.scope.resolve('addressService');
      const { /* customerId,  addressId, */ address } = req.body as UpdateAddressBody;

      // All the logic of retreiving address by Id and updationg it's values moved to ecommerce-plugin side
      const data = await addressService.update(/* customerId, addressId,  */ address);

      res.json(data);
    })
  );

  addressRouter.get(
    '/getById',
    wrapHandler(async (req, res) => {
      const addressService: AdressService = req.scope.resolve('addressService');
      const { customerId, addressId } = req.query as GetByIdADdressParams;

      const data = await addressService.retreiveById(customerId, addressId);

      res.json(data);
    })
  );

  addressRouter.delete(
    '/:id',
    wrapHandler(async (req, res) => {
      const addressService: AdressService = req.scope.resolve('addressService');
      const { customerId } = req.body as RemoveAddressBody;
      const { id } = req.params;

      const data = await addressService.remove(customerId, id);

      res.json(data);
    })
  );
};
