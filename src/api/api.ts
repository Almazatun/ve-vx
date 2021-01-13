import {instance} from "@/confirm/axios";

//API
export const API_TODO_LISTS = {
    getTodoLists(){
        return instance.get<Array<GetTodoList>>(`/todo-lists`)
            .then((res: { data: Array<GetTodoList> }) => res.data)
    },
    createTodoList(data: {title: string}){
        return instance.post<UniqueResponse<GetTodoList>>('/todo-lists', data).
        then((res: { data: UniqueResponse<GetTodoList> }) => res.data)
    },
    deleteTodoList(todolistId: string){
        return instance.delete<UniqueResponse>(`/todo-lists/${todolistId}`)
            .then((res: {data: UniqueResponse}) => res.data)
    },
    updateTodoList(todolistId :string, data: {title: string}){
        return instance.put<UniqueResponse>(`/todo-lists/${todolistId}`, data)
            .then((res: {data: UniqueResponse}) => res.data)
    }
}

export const API_ITEMS = {
    getItemsOfTheList(todolistId: string) {
        return instance.get<GetItems>(`/todo-lists/${todolistId}/tasks`).then(response => response.data)
    },
    createItemOfSpecialList(todolistId: string, newTitle: string) {
        return  instance.post<UniqueResponse<Item>>(`/todo-lists/${todolistId}/tasks`, {title: newTitle})
            .then(response => {return response.data})
    },
    updateParticularDataOfSpecialList(todolistId: string, itemId: string, model: UpdateItemModel) {
        return  instance.put<UniqueResponse>(`/todo-lists/${todolistId}/tasks/${itemId}`, model)
    },
    updateParticularDataList(todolistId: string, itemId: string, value: string) {
        return  instance.put<UniqueResponse>(`/todo-lists/${todolistId}/tasks/${itemId}`, {title: value})
            .then(response => response.data)
    },
    deleteItemOfSpecialList(todoListId: string, itemId: string) {
        return  instance.delete<UniqueResponse>(`/todo-lists/${todoListId}/tasks/${itemId}`).then(response => response.data)
    }
}

//Types
export interface GetTodoList {
    id: string
    addedData: string | number
    order: number
    title: string
}
export interface UniqueResponse<T = {}> {
    resultCode: number
    messages: Array<string>,
    data: {item: T}
}
interface GetItems<T = Item> {
    items: Array<T>
}
export interface Item {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: bigint | string
    deadline: bigint | string
    id: string
    todoListId: string
    order: number
    addedDate: bigint | string
}
export interface UpdateItemModel {
    title: string
    description: string
    completed: boolean
    status: ItemStatuses
    priority: number
    startDate: string | bigint
    deadline: string | bigint
}

//Enums
export enum ItemStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}