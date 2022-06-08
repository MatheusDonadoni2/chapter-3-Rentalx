import { Repository } from 'typeorm';

import dataSource from '../../../../typeorm';
import { Category } from '../../entities/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoryRepository';

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = dataSource.getRepository(Category);
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
