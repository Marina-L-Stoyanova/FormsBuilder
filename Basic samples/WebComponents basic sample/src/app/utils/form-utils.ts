export function formDataToObject(form: HTMLFormElement): any {
    return Array.from((new FormData(form)).entries()).reduce((obj: any, pair: any) => {
        const [key, value] = pair;
        const keys = key.split('.');
        const last = keys.pop();
        let target = obj;
        // expand structure (if needed) and navigate to target:
        keys.forEach((k: any) => { target[k] ??= {}; target = target[k]; });
        target[last] = value;
        return obj;
    }, {});
}