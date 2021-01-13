export function hasProp<T>(prop: string, props: T): props is T {
    return prop in props;
}
