export default function (markers = [], action) {
    if (action.type === 'addMarker') {
        let temp = [...markers];
        temp.push({ coordinate: action.coordinate, title: action.title, description: action.description })
        return temp
    }
    if (action.type === 'deleteMarker') {
        return markers.filter(e => e.coordinate.latitude !== action.coordinate.latitude && e.coordinate.longitude !== action.coordinate.longitude)
    }
    return markers;
}