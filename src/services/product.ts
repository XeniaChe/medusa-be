import { ProductService as MedusaProductService, Product } from '@medusajs/medusa';
// import { Product } from '../models/product';
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
  async getProductsBySlug(slug: string) {
    const prodRepo: typeof ProductRepository = this.activeManager_.withRepository(
      this.productRepository_
    );

    return await prodRepo.findOne({
      where: { title: slug },
      relations: {
        variants: { prices: true, options: true },
        images: true,
        options: { values: true }
      }
    });
  }
  /*
    // TODO: remove. No intervantions into original entities/DB schema ath the moment
  async getProductsBySlug(value: string): Promise<Product[]> {
    const products = await this.prodRepo.getProductBySlug(value);

    if (!products.length) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Product was not found');
    }

    return products;
  }
  
  */

  async getProductByKeyword(key: string, limit: number, offcet: number) {
    const conditions = [
      {
        title: Like(`%${key}%`)
      },
      {
        description: Like(`%${key}%`)
      },
      {
        handle: Like(`%${key}%`)
      }
    ];

    const relations = {
      variants: { options: true, prices: true },
      images: true,
      options: { values: true }
    };
    const base =
      limit && offcet
        ? { skip: offcet, take: limit, where: conditions, relations, cache: true }
        : { where: conditions, relations, cache: true };

    const products = await this.prodRepo.find(base);
    const count = await this.prodRepo.productByKeywordCount(key);

    if (!products) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Product was not found');
    }

    return { products, count };
  }
}

export default ProductService;
