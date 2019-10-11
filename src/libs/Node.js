class Node {
  constructor() {
    if (this.constructor === Node) {
      throw new Error("Abstract classes cannot be instantiated.");
    }
  }

  parse() {
    throw new Error("Method 'parse()' must be implemented.");
  }

  evaluate() {
    throw new Error("Method 'evaluate()' must be implemented.");
  }

  nameCheck() {
    // TODO: when name check is implemented
  }

  typeCheck() {
    // TODO: when type check is implemented
  }
}