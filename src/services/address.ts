import { TransactionBaseService, Address, Customer, Country } from '@medusajs/medusa';
import { AddressRepository } from '../repositories/address';
import { MedusaError } from '@medusajs/utils';
import { AddressDraft } from 'src/types';

class AdressService extends TransactionBaseService {
  protected addressRepository_: typeof AddressRepository;

  constructor(container) {
    super(container);

    this.addressRepository_ = container.addressRepository;
  }

  addressRepo: typeof AddressRepository;
  async list(id: string): Promise<Address[]> {
    // const addressRepo = this.activeManager_.getRepository(Address);
    const addressRepo = this.activeManager_.withRepository(this.addressRepository_);
    console.log({ addressRepo });
    const addresses = await addressRepo.find({ where: { customer_id: id } });

    if (!addresses) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Addresses were not found');
    }
    return addresses;
  }

  async addToCustomer(id: string, payload: AddressDraft) {
    const addressRepo = this.activeManager_.withRepository(this.addressRepository_);
    console.log({ addressRepo });
    // const addressRepo = this.activeManager_.getRepository(Address);
    const dataDraft = {
      customer_id: id,
      ...payload
    };

    const newAddress = await addressRepo.createNew(dataDraft);
    // const newAddress2 = await addressRepo.create(dataDraft);
    if (!newAddress) {
      throw new MedusaError(MedusaError.Types.DB_ERROR, 'Error creating address');
    }

    return newAddress;
  }

  async update(customerId: string, addressId: string, payload: AddressDraft) {
    const addressRepo = this.activeManager_.withRepository(this.addressRepository_);

    const dataDraft = {
      customer_id: customerId,

      ...payload
    };

    const updatedAddress = await addressRepo.update(addressId, dataDraft);

    if (!updatedAddress) {
      throw new MedusaError(MedusaError.Types.DB_ERROR, 'Error updating address');
    }

    return updatedAddress;
  }
}

export default AdressService;
