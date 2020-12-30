import {instance} from "@/confirm/axios";

//API
export const API_TODO_LISTS = {
    getTodoLists(){
        return instance.get<Array<IGetTodoLists>>(`/todo-lists`)
            .then((res: { data: Array<IGetTodoLists> }) => res.data)
    },
    createTodoList(data: {title: string}){
        return instance.post<IUniqueTodoListRes<IGetTodoLists>>('/todo-lists', data).
        then((res: { data: IUniqueTodoListRes<IGetTodoLists> }) => res.data)
    },
    deleteTodoList(todolistId: string){
        return instance.delete<IUniqueTodoListRes>(`/todo-lists/${todolistId}`)
            .then((res: {data: IUniqueTodoListRes}) => res.data)
    },
    updateTodoList(todolistId :string, data: {title: string}){
        return instance.put<IUniqueTodoListRes>(`/todo-lists/${todolistId}`, data)
            .then((res: {data: IUniqueTodoListRes}) => res.data)
    }
}

//Types
interface IGetTodoLists {
    id: string
    addedData: bigint
    order: number
    title: string
}
interface IUniqueTodoListRes<T = {}> {
    resultCode: number
    messages: Array<string>,
    data: {item: T}
}