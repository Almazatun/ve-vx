import {TodoListsStoreModuleTypes} from "@/store/modules/todo_lists/todo_lists_module_types";
import {ItemsStoreModuleTypes} from "@/store/modules/todo_items/todo_items_module_types";
import {AuthStoreModuleTypes} from "@/store/modules/auth_login/auth_module_types";

export interface StoreModules {
    TLS:  TodoListsStoreModuleTypes,
    IMS:  ItemsStoreModuleTypes,
    AUTH: AuthStoreModuleTypes
}

