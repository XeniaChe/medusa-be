import { Product } from '../models/product';
import { dataSource } from '@medusajs/medusa/dist/loaders/database';
import { ProductRepository as MedusaProductRepository } from '@medusajs/medusa/dist/repositories/product';

export const ProductRepository = dataSource.getRepository(Product).extend({
  ...MedusaProductRepository,

  async getProductBySlug(value: string): Promise<Product[]> {
    const products = await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'productVariants')
      .where('product.slug = :slug', {
        slug: value
      })
      .printSql()
      .getMany();

    return products;
  }

  // Managed by default .find() method within productService
  // Left as an example implementation
  /*   async searchByKey(key: string): Promise<Product> {
    const product = await this.createQueryBuilder('product')
      .where('product.title = :key', { key })
      // .orWhere("user.lastName = :lastName", { lastName: "Saw" })
      .printSql()
      .getOne();

    return product;
  } */
});

export default ProductRepository;
