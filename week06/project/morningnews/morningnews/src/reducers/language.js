export default function (language = 'fr', action) {
    if (action.type === 'setLanguage') {
        return action.language;
    }
    return language;
}