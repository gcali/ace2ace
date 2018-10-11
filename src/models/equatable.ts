export default interface Equatable<T> {
    equals: (T) => boolean
};