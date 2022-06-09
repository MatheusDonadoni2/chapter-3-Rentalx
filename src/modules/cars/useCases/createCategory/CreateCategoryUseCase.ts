import { ICategoriesRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
    name: string;
    description: string;
}
class CreateCategoryUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private categoriesRepository: ICategoriesRepository) { }

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadyExist = await this.categoriesRepository.findByName(
            name,
        );

        if (categoryAlreadyExist) {
            throw new Error('Category already exists.');
        }
        this.categoriesRepository.create({ name, description });
    }
}
export { CreateCategoryUseCase };
