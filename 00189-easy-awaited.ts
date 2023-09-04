// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>

type aa = PromiseLike<T>

// ============= Your Code Here =============
type MyAwaited<T extends {then: (onfulfilled: (arg: X) => any) => any}, X = any> = T extends Promise<infer U>
  ? U extends Promise<infer U2>
    ? U2  extends Promise<infer U3>
      ? U3
      : U2
    : U
  : X
