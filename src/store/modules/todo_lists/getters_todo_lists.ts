import {TodoLists, TodoListsStateT} from "@/store/modules/todo_lists/todo_lists";
import {GetterTree} from "vuex";
import {RootState} from "@/confirm/types";

//Types
export interface GettersTodoLists {
    todoLists(state: TodoListsStateT): TodoLists
}

export const gettersTodoLists: GetterTree<TodoListsStateT, RootState> &  GettersTodoLists = {
    todoLists(state) {
        return state.todoLists
    }
}