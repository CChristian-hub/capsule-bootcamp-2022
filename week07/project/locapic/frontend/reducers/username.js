export default function (username = '', action) {
    if (action.type === 'saveUsername') {
        return action.username
    }
    return username;
}