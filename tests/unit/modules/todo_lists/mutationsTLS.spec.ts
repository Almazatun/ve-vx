import {TodoList, TodoListsStateT} from "@/store/modules/todo_lists/todo_lists";
import {mutationsTodoLists} from "@/store/modules/todo_lists/mutations_todo_lists";
import {StatusT} from "@/store";

let startState: TodoListsStateT

beforeEach(() => {
    startState = {
        todoLists: [
            {
                id: '1',
                addedData: '1',
                order: 1,
                title: 'List1',
                requestStatus: 'idle'
            },
            {
                id: '2',
                addedData: '2',
                order: 2,
                title: 'List3',
                requestStatus: 'idle'
            },
            {
                id: '3',
                addedData: '3',
                order: 3,
                title: 'List3',
                requestStatus: 'idle'
            },
        ]
    }
})

describe("Mutations of the todo lists, mutations_todo_lists.ts", () => {
    it("receive data from server should be added todo lists initial state", () => {
        const startState: TodoListsStateT = {
            todoLists: []
        }
        const receivedTodoListsFromServer: TodoListsStateT = startState
        mutationsTodoLists.SET_TLS(startState, receivedTodoListsFromServer)
        expect(startState.todoLists.length).toEqual(3);
    })
    it("new todo list should be added todo lists state", () => {
        const newTodoList: TodoList = {
            id: 'newTodo',
            addedData: '2021',
            order: 4,
            title: '2021',
            requestStatus: 'idle'
        }
        mutationsTodoLists.ADD_TL(startState, {newTodoList: newTodoList})
        expect(startState.todoLists.length).toEqual(4);
        expect(startState.todoLists[3].title).toEqual('2021');
    })
    it("specific todo list should be set new title name", () => {
        const payload: {todoListId: string, title: string} = {todoListId: '1', title: 'Travel'}

        mutationsTodoLists.CHANGE_TL_TITLE(startState, payload)
        expect(startState.todoLists[0].title).toEqual('Travel');
        expect(startState.todoLists.length).toEqual(3);
    })
    it("specific todo list should be removed from todo lists state", () => {
        const todoId: {todoListId: string} = {todoListId: '1'}

        mutationsTodoLists.REMOVE_TL(startState, todoId)
        expect(startState.todoLists.length).toEqual(2);
    })
    it("specific todo list should be set new todo list status", () => {
        const payloadChangeStatus : {todoListId: string, status: StatusT} = {todoListId: '1', status: "loading"}

        mutationsTodoLists.CHANGE_TL_STATUS(startState, payloadChangeStatus)
        expect(startState.todoLists.length).toEqual(3);
        expect(startState.todoLists[0].requestStatus).toEqual('loading');
    })
});
