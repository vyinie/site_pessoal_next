export class verifiers {
  /** faz uma checagem em um obj e
   *  retorna false se algum item for invalido  */
  ObjChecker(object: object) {
    const invalid = ["", "0", null, 0];
    const inputNames = Object.keys(object);
    const verifier = inputNames.every((i) =>
      invalid.every((t) => object[i] !== t)
    );
    return verifier;
  }
  /** verifica o value de um input, 
   ** o paremetro tem de ser 'element.value'
   */
  InpChecker(string: string) {
    const verifier = typeof string === "string" && string.length > 0;
    return verifier;
  }
}
