export default function (videos = [], action) {
    if (action.type === 'addVideo') {
        return [...videos, { thumbnailUrl: action.thumbnailUrl, videoUrl: action.videoUrl }]
    }
    return videos;
}