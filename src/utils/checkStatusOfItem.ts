import {ItemStatuses} from "@/api/api";

export const  checkStatusOfItem = (status: number) =>{
    // eslint-disable-next-line
    let colorStyle: string = ''
    if (status === ItemStatuses.New) {
        colorStyle = 'green'
    } else if (status === ItemStatuses.InProgress){
        colorStyle = 'yellow'
    } else if (status === ItemStatuses.Completed) {
        colorStyle = 'orange'
    } else {
        console.log('Not received item status ❌')
    }
    return colorStyle
}