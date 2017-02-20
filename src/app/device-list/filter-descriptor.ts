import { FilterItem } from './filter-item'
import { FilteringLogic } from './filtering-logic';

export class FilterDescriptor {
    filters: Array<FilterItem>;
    logic: FilteringLogic;
    limit?: number;
    offset?: number;
}