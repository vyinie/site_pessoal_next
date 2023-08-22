export class verifiers {
  ObjChecker(object:object) {
    const invalid = ["", "0", null, 0];
    const inputNames = Object.keys(object);
    const verifier = inputNames.every((i) =>
      invalid.every((t) => object[i] !== t)
    );
    return verifier;
  }
}