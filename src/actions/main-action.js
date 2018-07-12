
export const addUsers = (user) => {
    return {
        type: 'ADD_USER',
        user
    };
}

export const sendStatusUser = (id) => {
    return {
        type: 'SEND_USER',
        id
    };
}

export const onDeleteUsers = (ids) => {
    return {
        type: 'DELETE_USERS',
        ids
    };
}
