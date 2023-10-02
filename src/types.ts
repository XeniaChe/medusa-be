import { Customer, Country } from '@medusajs/medusa';

export type AddressDraft = {
  customer_id?: string;
  customer?: Customer;
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  country_cod?: null;
  country?: Country;
  province?: string;
  postal_code?: string;
  phone?: string;
};
