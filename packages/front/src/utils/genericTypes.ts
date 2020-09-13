export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type DeepWriteable<T> = {
  -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never; // without nested objs
