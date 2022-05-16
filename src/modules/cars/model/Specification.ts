import { v4 as uuiV4 } from 'uuid';

class Specification {
  id?: string;
  name: string;
  description: string;
  create_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuiV4();
    }
  }
}

export { Specification };
