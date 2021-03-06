{
  /*
  * JavaScript λ³μ μ μΈ
    var : old π©  not recommended
    let ES6
    const ES6
    
  * JavaScript Basic Type
    Primitive : number string boolean null undefined symbol bigint
    Reference(object) : function array ...

    -> νμμ€ν¬λ¦½νΈ μ­μ μμ λμΌνλ, μ’ λ μκ²©νκ² νμμ κ΅¬λΆνλ€.
  */

  const num: number = 10;
  const str: string = 'string';
  const bool: boolean = true;

  // undefined
  let age: undefined = undefined; // π© λΉμΆ
  let name: string | undefined; // 1οΈβ£
  name = undefined;
  name = 'jjanmo';

  // example
  function findSomething(): string | undefined {
    const result = 'find something!'; // μ΄ λΆλΆμ λ­κ°λ₯Ό μ°Ύλ λ‘μ§μ΄ λ€μ΄κ°λ€. μ¬κΈ°μλ κ°λ¨νκ² λ¬Έμμ΄λ‘ νν!
    if (result) return 'something';
    else return undefined;
  }

  // null
  let human: null; // π© λΉμΆ
  // human = 'jjanmo'; // null νμμΌλ‘ μ μνκΈ° λλ¬Έμ λ€λ₯Έ νμμ λ΄μ μ μλ€.
  let human2: string | null; // 2οΈβ£
  human2 = null;
  human2 = 'jjanmo';

  // β λ°μ΄ν° νμμ΄ κ²°μ λμ΄μμ§ μκ±°λ κ²°μ λμλ€λ μλ―Έμμ μ¬μ©νκΈ° μν΄μ  1οΈβ£μ μ£Όλ‘ μ¬μ©νλ€.
  // -> κ°μ΄ μκ±°λ μλ€ λΌλ μλ―Έμμλ 2οΈβ£μ μ¬μ©νλ κ²μ΄ λ λ§μ μλ μλ€.

  // unknown π©
  let notSure: unknown; // π© μ΄λ€ νμμ΄ λ€μ΄κ°μ§ λͺ¨λ₯Ό λ, but μ λ§νλ©΄ μ¬μ©νμ§ μλ κ²μ΄ μ’λ€
  // κ·Έλ°λ° μλ μ΄μ ? μλ°μ€ν¬λ¦½νΈ λΌμ΄λΈλ¬λ¦¬λ₯Ό μ΄μ©νλ κ²½μ°μ λ¦¬ν΄νμμ λͺ¨λ₯Όμ μλ€. μ΄λ° κ²½μ° μ¬μ©νκΈ° μν΄μ μ‘΄μ¬!
  // κ·ΈλΌμλ μ¬μ©νμ§ μλ κ²μ μΆμ²!
  notSure = 0;
  notSure = 'string';
  notSure = null;

  // any π© : unknownκ³Ό λ§μ°¬κ°μ§!!
  let anything: any = 0;
  anything = 'anything';

  // void
  function logText(text): void {
    console.log(text);
    // return;  // μ¬μ€ μ΄κ²μ΄ μλ΅λμ΄ μλ κ²!
  }
  // μλ¬΄κ²λ λ¦¬ν΄νμ§ μλ ν¨μμ λν΄μ  void νμμ μ¬μ©νλ€.
  // μΌλ°μ μΌλ‘ ν¨μμ void νμμ λΆμ΄κΈ΄νμ§λ§, μλΆμ¬λ λλ€. λΆμΌμ§ λ§μ§μ λν κ²μ νμ¬μ μ»¨λ²€μμΌλ‘ μ§μ νμ¬ μ¬μ©ν  μ μλ€.

  let notReturn: void = undefined; // π© : μ΄λ κ² μ¬μ©νλ κ²½μ°λ 99.9999% μλ€. ν­μ λΉμ΄μλ κ°λ§ ν λΉν΄μΌνκΈ° λλ¬Έμ!

  // never : ν¨μμμ μ λλ‘ κ°μ λ¦¬ν΄ν  μ μμ λ
  function throwError(message: string): never {
    // error λ°μ -> message -> server
    throw new Error(message); // 1)
    while (true) {} // 2) λ¬΄νλ£¨ν
  }

  let neverEnding: never; // π© π© π©

  // object  π©
  let obj: object;

  function getObject(obj: object) {}
  getObject({ name: 'jjanmo' });
  getObject({ cafe: 'coffebean' });
  getObject([1, 2, '10', '123']);

  // objectνμμ μ΄λ ν objectλ  λ€ λλ€. μ’ λ κ΅¬μ²΄μ μΌλ‘ objectλ₯Ό μ μν΄μ£Όλ κ²μ΄ μ’λ€.
}
