import { Repository } from 'typeorm';

import dataSource from '../../../../database/DataSource';
import { Category } from '../../entities/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoryRepository';

const categoriesRepository = dataSource.getRepository(Category);

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    // eslint-disable-next-line no-use-before-define
    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.repository = categoriesRepository;
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }
    async list(): Promise<Category[]> {
        const category = await this.repository.find();
        return category;
    }
    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOneBy({ name });
        return category;
    }
}
export { CategoriesRepository };
