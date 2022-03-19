
export default function (photos = [], action) {
    if (action.type === 'addPicture') {
        return [...photos, { url: action.url, face: action.face }]
    }
    return photos;
}


