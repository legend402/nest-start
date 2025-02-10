export function travelTree<T extends Record<string, any>>(tree: T[], cb: (params: T) => void) {
    const stack = [...tree];
    while (stack.length) {
        const item = stack.pop();
        if (item) {
            cb(item);
        }
        if (item.children) {
            stack.push(item.children);
        }
    }
}
