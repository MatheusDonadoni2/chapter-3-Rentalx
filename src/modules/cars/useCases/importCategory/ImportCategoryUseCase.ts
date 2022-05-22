import { parse as csvParse } from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoryRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesrepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = csvParse();
      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }
  async execute(file: any): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const { name, description } = category;
      const existCategory = this.categoriesrepository.findByName(name);
      if (!existCategory) {
        this.categoriesrepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
