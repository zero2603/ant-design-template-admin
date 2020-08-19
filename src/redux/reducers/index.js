import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from "./UserReducer";
import CustomerReducer from "./CustomerReducer";
import NotificationReducer from "./NotificationReducer";
import RequestReducer from "./RequestReducer";
import DocumentationReducer from "./DocumentationReducer";
import ProductReducer from "./ProductReducer";
import CategoryReducer from "./CategoryReducer";
import PartnerReducer from "./PartnerReducer";
import DatacenterReducer from "./DatacenterReducer";
import ServiceReducer from "./ServiceReducer";
import PermissionReducer from "./PermissionReducer";
import StatisticReducer from "./StatisticReducer";
import RoleReducer from "./RoleReducer";
import TaskReducer from "./TaskReducer";
import PotentialCustomerReducer from "./PotentialCustomerReducer";
import ConfigReducer from "./ConfigReducer";
import TransactionReducer from "./TransactionReducer";
import CustomerReviewReducer from "./CustomerReviewReducer";
import WareHouseReducer from "./WareHouseReducer";
import ShopReducer from "./ShopReducer";
import OrderReducer from "./OrderReducer";
import ServiceCategroyReducer from "./ServiceCategroyReducer";
import WebCustomerReducer from "./WebCustomerReducer";
import MailReducer from './MailReducer';
import RequestUpdateProductReducer from './RequestUpdateProductReducer';
import CustomerHistoryReducer from './CustomerHistoryReducer';
import ProductOverloadReducer from './ProductOverloadReducer';
import SupportCallReducer from './SupportCallReducer';
import RequestUpdateCustomerReducer from './RequestUpdateCustomerReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    customer: CustomerReducer,
    notification: NotificationReducer,
    request: RequestReducer,
    documentation: DocumentationReducer,
    product: ProductReducer,
    category: CategoryReducer,
    partner: PartnerReducer,
    datacenter: DatacenterReducer,
    service: ServiceReducer,
    permission: PermissionReducer,
    statistic: StatisticReducer,
    role: RoleReducer,
    task: TaskReducer,
    potentialCustomer: PotentialCustomerReducer,
    config: ConfigReducer,
    transaction: TransactionReducer,
    customerReview: CustomerReviewReducer,
    wareHouse: WareHouseReducer,
    shop: ShopReducer,
    order: OrderReducer,
    serviceCategory: ServiceCategroyReducer,
    webCustomer: WebCustomerReducer,
    mail: MailReducer,
    editProductRequest: RequestUpdateProductReducer,
    customerHistory: CustomerHistoryReducer,
    productOverload: ProductOverloadReducer,
    supportCall: SupportCallReducer,
    updateCustomerRequest: RequestUpdateCustomerReducer,
});

export default rootReducer;