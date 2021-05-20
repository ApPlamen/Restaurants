import { OrderedItemStatusesEnum } from "../enums/ordered-item-statuses.enum";

export class OrderedMenuItemManagementBoard {
  id: number;
  tableNumber: string;
  menuItem: string;
  option: string;
  orderedItemStatus: OrderedItemStatusesEnum;
  dateTime: string;
}
