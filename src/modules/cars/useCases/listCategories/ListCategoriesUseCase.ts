import { ICategoriesRepository } from '../../repositories/ICategoryRepository';

class ListCategoriesUseCase {
    // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }
    execute() {
        const categories = this.categoriesRepository.list();
        return categories;
    }
}

export { ListCategoriesUseCase };
