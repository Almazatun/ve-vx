import {ItemsStateT} from "@/store/modules/todo_items/todo_Items";
import {mutationsItems} from "@/store/modules/todo_items/mutations_todo_Items";
import {Item, ItemStatuses} from "@/api/api";
import {StatusT} from "@/store";
import {UpdateItem} from "@/confirm/types";

const firstTodoList: string = 'firstTodoList'
const secondTodoList: string = 'secondTodoList'
const thirdTodoList: string = 'thirdTodoList'


let startState: ItemsStateT

beforeEach(() => {
    startState = {
        items: {
            [firstTodoList]: [
                {
                    description: 'title1',
                    title: 'title1',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '1',
                    todoListId: firstTodoList,
                    order: 1,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
                {
                    description: 'title2',
                    title: 'title2',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '2',
                    todoListId: firstTodoList,
                    order: 2,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
                {
                    description: 'title3',
                    title: 'title3',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '3',
                    todoListId: firstTodoList,
                    order: 3,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
            ],
            [secondTodoList]: [
                {
                    description: 'title1',
                    title: 'title1',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '1',
                    todoListId: secondTodoList,
                    order: 1,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
                {
                    description: 'title2',
                    title: 'title2',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '2',
                    todoListId: secondTodoList,
                    order: 2,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
                {
                    description: 'title3',
                    title: 'title3',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '3',
                    todoListId: secondTodoList,
                    order: 3,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
            ],
            [thirdTodoList]: [
                {
                    description: 'title1',
                    title: 'title1',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '1',
                    todoListId: thirdTodoList,
                    order: 1,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
                {
                    description: 'title2',
                    title: 'title2',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '2',
                    todoListId: thirdTodoList,
                    order: 2,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
                {
                    description: 'title3',
                    title: 'title3',
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '01.2021',
                    deadline: '111',
                    id: '3',
                    todoListId: thirdTodoList,
                    order: 3,
                    addedDate: '2021',
                    requestStatus: 'idle'
                },
            ]
        }
    }
})

describe("Mutations, Items module, mutations_todo_items.ts", () => {
    it("receive data from server should be set initial state", () => {
        const initialState: ItemsStateT = {
            items: {}
        }
        const receivedDataFromServer: Array<Item> = [
            {
                description: 'title1',
                title: 'title1',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '01.2021',
                deadline: '111',
                id: '1',
                todoListId: firstTodoList,
                order: 1,
                addedDate: '2021',
            },
            {
                description: 'title2',
                title: 'title2',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '01.2021',
                deadline: '111',
                id: '2',
                todoListId: firstTodoList,
                order: 2,
                addedDate: '2021',
            },
            {
                description: 'title3',
                title: 'title3',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '01.2021',
                deadline: '111',
                id: '3',
                todoListId: firstTodoList,
                order: 3,
                addedDate: '2021',
            },
        ]
        mutationsItems.SET_ITEMS(initialState, {todoListId: firstTodoList, items: receivedDataFromServer})
        expect(initialState.items[firstTodoList].length).toEqual(3);
    })
    it("specific item should be deleted", () => {
        const payload: { todoListId: string, itemId: string } = {todoListId: secondTodoList, itemId: "3"}

        mutationsItems.DELETE_I(startState, payload)
        expect(startState.items[secondTodoList].length).toEqual(2);
        expect(startState.items[secondTodoList].length).not.toEqual(3);
        expect(startState.items[secondTodoList][0].id).toBe("1");
        expect(startState.items[secondTodoList][1].id).toBe("2");
    })
    it("specific item should be set new status", () => {
        const payload: { todoListId: string, itemId: string, status: ItemStatuses } = {
            todoListId: thirdTodoList, itemId: '1', status: ItemStatuses.Completed
        }

        mutationsItems.CHANGE_STATUS_I(startState, payload)
        expect(startState.items[thirdTodoList].length).toEqual(3)
        expect(startState.items[thirdTodoList][0].status).toEqual(2);
    })
    it("specific item should be set new title", () => {
        const item: UpdateItem = {
            title: 'Winter',
        }

        mutationsItems.UPDATE_PROPERTY_I(startState, {todoListId: secondTodoList, itemId: '1', item})
        expect(startState.items[secondTodoList].length).toEqual(3)
        expect(startState.items[secondTodoList][0].title).toEqual('Winter');
    })
    it("specific item should be set new request status", () => {
        const payload: { todoListId: string, itemId: string, requestStatus: StatusT } = {
            todoListId: firstTodoList, itemId: '2', requestStatus: 'failed'
        }

        mutationsItems.CHANGE_REQUEST_STATUS_I(startState, payload)
        expect(startState.items[firstTodoList].length).toEqual(3)
        expect(startState.items[firstTodoList][1].requestStatus).toEqual('failed');
    })
    it("new item should be added special todolist", () => {
        const payload: Item = {
            description: 'newItem',
            title: 'Angular',
            completed: false,
            status: 0,
            priority: 0,
            startDate: '2021.01',
            deadline: '2021.01',
            id: '2021',
            todoListId: firstTodoList,
            order: 1,
            addedDate: '2021.01'
        }

        mutationsItems.ADD_NEW_I(startState, {todoListId: firstTodoList, item: payload})
        expect(startState.items[firstTodoList].length).toEqual(4)
        expect(startState.items[firstTodoList][0].title).toEqual('Angular');
    })
    it("specific property should be updated of the specific item", () => {
        const item: UpdateItem = {
            status: 100,
        }

        const keys = Object.keys(startState.items[firstTodoList][0])

        mutationsItems.UPDATE_PROPERTY_I(startState, {todoListId: firstTodoList, itemId: '1', item})
        expect(startState.items[firstTodoList].length).toEqual(3)
        expect(startState.items[firstTodoList][0].status).toEqual(100);
        expect(keys).toEqual([
            'description',
            'title',
            'completed',
            'status',
            "priority",
            "startDate",
            "deadline",
            "id",
            "todoListId",
            "order",
            "addedDate",
            "requestStatus",
        ])
    })
});

