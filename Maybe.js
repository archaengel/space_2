export default class Maybe {
  constructor(x) {
    this.$value = x
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined
  }

  get isJust() {
    return !this.isNothing()
  }

  static of(x) {
    return new Maybe(x)
  }

  map(fn) {
    return this.isNothing
    ? Maybe.of(null)
    : Maybe.of(fn(this.$value))
  }

  join() {
    return this.isNothing ? this : this.$value
  }

  chain(fn) {
    return this.map(fn).join()
  }

}
