import { DataSource } from 'typeorm';

import { Category } from '../modules/cars/entities/Category';

const dataSource = new DataSource({
    type: 'postgres',
    port: 5432,
    username: 'docker',
    password: 'ignite',
    database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
    entities: [Category],
    migrations: [],
});

export function createConnection(host = 'database'): Promise<DataSource> {
    return dataSource.setOptions({ host }).initialize();
}
export default dataSource;
