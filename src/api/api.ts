import {instance} from "@/confirm/axios";

//API
export const API_TODO_LISTS = {
    getTodoLists(){
        return instance.get<Array<GetTodoList>>(`/todo-lists`)
            .then((res: { data: Array<GetTodoList> }) => res.data)
    },
    createTodoList(data: {title: string}){
        return instance.post<UniqueTodoListRes<GetTodoList>>('/todo-lists', data).
        then((res: { data: UniqueTodoListRes<GetTodoList> }) => res.data)
    },
    deleteTodoList(todolistId: string){
        return instance.delete<UniqueTodoListRes>(`/todo-lists/${todolistId}`)
            .then((res: {data: UniqueTodoListRes}) => res.data)
    },
    updateTodoList(todolistId :string, data: {title: string}){
        return instance.put<UniqueTodoListRes>(`/todo-lists/${todolistId}`, data)
            .then((res: {data: UniqueTodoListRes}) => res.data)
    }
}

//Types
export interface GetTodoList {
    id: string
    addedData: string | number
    order: number
    title: string
}
export interface UniqueTodoListRes<T = {}> {
    resultCode: number
    messages: Array<string>,
    data: {item: T}
}