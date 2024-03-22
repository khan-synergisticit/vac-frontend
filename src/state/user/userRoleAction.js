import * as ActionType from "../actionTypes";


export const AddUserRoleToStore = (role) => {
    return {
        type: ActionType.AddUserRoleToStore,
        payload: role
    }
}