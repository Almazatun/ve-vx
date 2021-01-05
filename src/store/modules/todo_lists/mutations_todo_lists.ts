import {TodoList, TodoLists, TodoListsStateT} from "@/store/modules/todo_lists/todo_lists";
import {MutationTree} from "vuex";
import {StatusT} from "@/store";
import {GetTodoList} from "@/api/api";

//Enums
export enum MUTATIONS_TODO_LISTS {
    SET_TLS = 'SET_TLS',
    ADD_TL = 'ADD_TL',
    REMOVE_TL = 'REMOVE_TL',
    CHANGE_TL_TITLE = 'CHANGE_TL_TITLE',
    CHANGE_TL_STATUS = 'CHANGE_TL_STATUS'
}
//Types
export type MutationsTodoListsT<STLS = TodoListsStateT> = {
    [MUTATIONS_TODO_LISTS.SET_TLS](state: STLS, payload: {todoLists: Array<GetTodoList>}): void
    [MUTATIONS_TODO_LISTS.ADD_TL](state: STLS, payload: {newTodoList: TodoList }): void
    [MUTATIONS_TODO_LISTS.REMOVE_TL](state: STLS, payload: { todoListId: string }): void
    [MUTATIONS_TODO_LISTS.CHANGE_TL_TITLE](state: STLS, payload: {todoListId: string, title: string}): void
    [MUTATIONS_TODO_LISTS.CHANGE_TL_STATUS](state: STLS, payload: {todoListId: string, status: StatusT}): void
}

export const mutationsTodoLists: MutationTree<TodoListsStateT> & MutationsTodoListsT = {
    [MUTATIONS_TODO_LISTS.SET_TLS](state, payload){
        const newTodoListsArr: TodoLists  = payload.todoLists.map(tl => {
            return {...tl, requestStatus: 'idle'}
        })
        state.todoLists = [...state.todoLists, ...newTodoListsArr]
    },
    [MUTATIONS_TODO_LISTS.ADD_TL](state, payload){
       state.todoLists.push(payload.newTodoList)
    },
    [MUTATIONS_TODO_LISTS.REMOVE_TL](state, payload){
        state.todoLists = state.todoLists.filter(tl => tl.id !== payload.todoListId)
    },
    [MUTATIONS_TODO_LISTS.CHANGE_TL_TITLE](state, payload){
        state.todoLists = state.todoLists.map(tl => tl.id === payload.todoListId ? {...tl, title: payload.title} : tl)
    },
    [MUTATIONS_TODO_LISTS.CHANGE_TL_STATUS](state, payload){
        state.todoLists = state.todoLists.map(tl => tl.id === payload.todoListId ? {...tl, requestStatus: payload.status} : tl)
    }
}

/* eslint-disable */
//debugger

