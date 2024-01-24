const initial = {
    restaurants: [],
    adminUser: [],
    menu: [],
    adminMenu: [],
    users: [],
    currentUser: [],
    billAmount: [],
    userCart: []
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case 'getResList': return { ...state, restaurants: action.payload }
            break;
        case "getMenu": return { ...state, menu: action.payload }
            break;
        case "fatchadminMenu": return { ...state, adminMenu: action.payload }
            break;
        case "addUserAdmin": return { ...state, adminUser: action.payload }
            break;
        case "UserList": return { ...state, users: action.payload }
            break;
        case "addCurrentUser": return { ...state, currentUser: action.payload }
            break;
        case "UPDATEUSER": return { ...state, currentUser: action.payload }
            break;
        case "SETBILLAMOUNT": return { ...state, billAmount: action.payload }
            break;
        case "USERCART": return { ...state, userCart: action.payload }
            break;
    }
    return state;
}
// console.log(initial)
export default reducer;