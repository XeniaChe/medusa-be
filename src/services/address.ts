import { TransactionBaseService, Address } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';
import { AddressDraft } from 'src/types';

class AdressService extends TransactionBaseService {
  addressRepo;

  constructor(container) {
    super(container);

    this.addressRepo = this.activeManager_.getRepository(Address);
  }

  async list(id: string): Promise<Address[]> {
    const addresses = await this.addressRepo.find({ where: { customer_id: id } });

    if (!addresses) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Addresses were not found');
    }
    return addresses;
  }

  async addToCustomer(id: string, payload: object) {
    const dataDraft: AddressDraft = {
      customer_id: id,
      ...payload
    };

    const newAddressDraft = await this.addressRepo.create(dataDraft);
    const newAddress = await this.addressRepo.save(newAddressDraft);

    if (!newAddress) {
      throw new MedusaError(MedusaError.Types.DB_ERROR, 'Error creating address');
    }

    return newAddress;
  }

  async retreiveById(customerId: string, addressId: string) {
    const address = await this.addressRepo.findOne({
      where: {
        id: addressId,
        customer_id: customerId
      }
    });

    if (!address) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Error. Address does not exist');
    }

    return address;
  }

  async update(/* customerId: string, addressId: string,  */ payload: object) {
    /*  const address = await this.addressRepo.findOne({
      where: {
        id: addressId,
        customer_id: customerId
      }
    });

    if (!address) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Error. Address does not exist');
    } */

    const updatedAddress = await this.addressRepo.save(payload);

    if (!updatedAddress) {
      throw new MedusaError(MedusaError.Types.DB_ERROR, 'Error updating address');
    }

    return updatedAddress;
  }

  async remove(customerId: string, addressId: string) {
    const address = await this.addressRepo.findOne({
      where: { id: addressId, customer_id: customerId }
    });

    if (!address) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Error. Address does not exist');
    }

    return await this.addressRepo.remove([address]);
  }
}

export default AdressService;
