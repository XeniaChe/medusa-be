// import { Product } from '../models/product';
import { Product } from '@medusajs/medusa';
import { dataSource } from '@medusajs/medusa/dist/loaders/database';
import { ProductRepository as MedusaProductRepository } from '@medusajs/medusa/dist/repositories/product';
import { Like } from 'typeorm';

export const ProductRepository = dataSource.getRepository(Product).extend({
  ...MedusaProductRepository,

  // TODO: remove
  // async searchProductsByKeyword(key: string): Promise<Product[]> {
  //   const products = await this.createQueryBuilder('product')
  //     // .leftJoin('product.options', 'option' /* 'productOptions' */)
  //     // .leftJoin('product.images', 'image')
  //     // .leftJoin('product.variants', 'productVariant')
  //     .where({ title: Like(`%${key}%`) })
  //     .orWhere({ description: Like(`%${key}%`) })
  //     .orWhere({ handle: Like(`%${key}%`) })
  //     .relation(Product, 'images', 'options', 'variants')
  //     .printSql()
  //     .getMany();

  //   return products;
  // },

  async productByKeywordCount(key: string) {
    return await this.createQueryBuilder('product')
      .where({ title: Like(`%${key}%`) })
      .orWhere({ description: Like(`%${key}%`) })
      .orWhere({ handle: Like(`%${key}%`) })
      .cache(true)
      .getCount();
  }
});

export default ProductRepository;
