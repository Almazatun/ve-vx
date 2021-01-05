import {GetTodoList} from "@/api/api";
import {mutationsTodoLists} from "./mutations_todo_lists";
import {actionsTodoLists} from "./actions_todo_lists";
import {gettersTodoLists} from "./getters_todo_lists";
import {RootState} from "@/confirm/types";
import {StatusT} from "@/store";
import {Module} from "vuex";


export interface TodoListsStateT {
    todoLists: TodoLists
}
export type TodoLists = Array<TodoList>

export interface TodoList extends GetTodoList {
    requestStatus: StatusT
}

const todoListsState: TodoListsStateT = {
    todoLists: []
}

export const moduleTodoLists: Module<TodoListsStateT, RootState> = {
    namespaced: true,
    state: todoListsState,
    mutations: mutationsTodoLists,
    actions: actionsTodoLists,
    getters: gettersTodoLists
}