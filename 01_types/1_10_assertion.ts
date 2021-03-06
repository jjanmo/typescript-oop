{
  /**
   * Type Assertions π©
   *  -> νμν κ²½μ°λ μμ§λ§ μ‘°μ¬ν μ¬μ©ν΄μΌνλ€.
   */

  // ex1)
  function getString(): any {
    // return 'hello'; // 1)
    return 5; // 2)
  }

  const result = getString();
  console.log((result as string).length); // λ¬Έμμ΄μμ λ¨μΈνλ€λ μλ―Έ
  // -> νμ λ¨μΈμ νκΈ°λλ¬Έμ μ»΄νμΌ λ¨κ³μμλ μλ¬κ° λμ§ μλλ€. νμ§λ§ λ°νμμμ μμμΉ λͺ»ν λ²κ·Έλ μλ¬κ° λ°μν  μ μλ€.
  console.log(<string>result.length); // μμ κ°μ νμλ¨μΈ

  // β νμ λ¨μΈμ μ λ§ μ λ§ 100% νμμ νμ ν  λ μ¬μ©νλ κ²μ΄ μ’λ€.

  // ex2)
  const blockout: any = 1004;
  // (blockout as Array<number>).push(10); // error : blockout.push is not a function

  // ex3)
  function findNames(): string[] | undefined {
    return undefined;
  }

  const names = findNames()!;
  //names.push('jjanmo'); // κ²½κ³  : λ°°μ΄μΌ μλ μμ§λ§ undefinedμΌ μλ μκΈ° λλ¬Έμ... -> μ΄ λ λ°°μ΄μμ νμ νλ€λ©΄ λλνλ₯Ό μ¬μ©ν  μ μλ€.
  // names!.push('jjanmo');

  // ex4)
  // const $block = document.querySelector('div')!;
  // console.log($block.textContent); // κ²½κ³  λ©μΈμ§λ₯Ό λμ΄λ€! nullμΌμλ μκΈ°λλ¬Έμ. μ€μ  κ΅¬νλΆλΆμΌλ‘ λ€μ΄κ°λ΄λ νμμ΄ nullμΌμλ μλ€κ³  μ νμμ

  /**
   * -> μ΄λ¬ν κ²½μ°
   *if($block) { code here } μ²λΌ μ‘°κ±΄λ¬Έμ κ±Έμ΄μ€ μ μλ€.

   * -> λ§μ½μ 100% μ‘΄μ¬ν¨μ νμ νλ€λ©΄ !λ₯Ό μ°μ΄μ€ μ μλ€.
  */
}
