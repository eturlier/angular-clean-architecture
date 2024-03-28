import { BaseEntity } from '@core/base/domain/models/base-entity.abstract.model';

export class <%= classify(name) %> extends BaseEntity {
    constructor(obj: unknown) {
        super(obj);
    }
}
