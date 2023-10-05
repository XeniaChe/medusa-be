import { DiscountService as MedusaDiscountService, Discount, Region } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';

class DiscountService extends MedusaDiscountService {
  async createDiscount(discDraft: object, regionId: string) {
    const discountRepo = this.activeManager_.getRepository(Discount);
    const regionRepo = this.activeManager_.getRepository(Region);

    const region = await regionRepo.findOne({ where: { id: regionId } });

    if (!region) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, 'Provided region was not found');
    }

    const newDiscDraft = discountRepo.create(discDraft);
    newDiscDraft.regions = [region];

    const newDisc = await discountRepo.save(newDiscDraft);

    return newDisc;
  }
}

export default DiscountService;
