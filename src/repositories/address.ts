import { Address } from '@medusajs/medusa';
import { dataSource } from '@medusajs/medusa/dist/loaders/database';

import { AddressDraft } from '../types';
import { ulid } from 'ulid';

const generateId = () => {
  const prefix = 'addr_';
  return prefix + ulid();
};

export const AddressRepository = dataSource.getRepository(Address).extend({
  async createNew(addressDraft: AddressDraft) {
    const {
      customer_id,
      customer,
      first_name,
      last_name,
      address_1,
      address_2,
      city,
      country_cod,
      country,
      province,
      postal_code,
      phone
    } = addressDraft;

    const address = await this.createQueryBuilder('address')
      .insert()
      .values({
        id: generateId(), // TODO: check why (???) id is not auto-generated
        customer_id,
        customer,
        first_name,
        last_name,
        address_1,
        address_2,
        city,
        country_cod,
        country,
        province,
        postal_code,
        phone
      })
      .execute();

    return address;
  },

  async update(addressId: string, dataDraft: AddressDraft) {
    const address = await this.createQueryBuilder('address')
      .update()
      .set({ ...dataDraft })
      .where('id = :id', { id: addressId })
      .execute();

    return address;
  }
});

export default AddressRepository;
