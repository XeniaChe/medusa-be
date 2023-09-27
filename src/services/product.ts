import { ProductService as MedusaProductService } from '@medusajs/medusa';
import { Product } from '../models/product';
import { MedusaError } from '@medusajs/utils';
import { ProductRepository } from '../repositories/product';
import { Like } from 'typeorm';

class ProductService extends MedusaProductService {
  protected productRepository_: typeof ProductRepository;
  prodRepo: typeof ProductRepository;

  constructor(container) {
    super(container);

    this.productRepository_ = container.productRepository;
    this.prodRepo = this.activeManager_.withRepository(this.productRepository_);
  }

  // One more way to find product and append productVariants(relation)
  /*   async getProductsBySlug(slug: string) {
    const prodRepo: typeof ProductRepository = this.activeManager_.withRepository(
      this.productRepository_
    );

    const res = await prodRepo.find({ where: { slug }, relations: { variants: true } });
  } */

  async getProductsBySlug(value: string): Promise<Product[]> {
    const products = await this.prodRepo.getProductBySlug(value);

    if (!products.length) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Product was not found');
    }

    return products;
  }

  async getProductByKeyword(key: string) {
    const products = await this.prodRepo.find({
      where: [
        {
          title: Like(`%${key}%`)
        },
        {
          description: Like(`%${key}%`)
        },
        {
          handle: Like(`%${key}%`)
        }
      ],
      relations: { variants: true /* , shipping_profile: true  */ }
    });

    if (!products) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Product was not found');
    }

    return products;
  }
}

export default ProductService;
