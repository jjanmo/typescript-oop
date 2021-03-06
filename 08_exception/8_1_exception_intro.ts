{
  // Java : Exception
  // JavaScript : Error

  type Direction = 'up' | 'down' | 'left' | 'right';

  const position = {
    x: 0,
    y: 0,
  };

  function move(direction: Direction): void {
    switch (direction) {
      case 'up':
        position.y++;
        break;
      case 'down':
        position.y--;
        break;
      case 'left':
        position.x--;
        break;
      case 'right':
        position.x++;
        break;
      default:
        const invalid: never = direction;
        throw new Error(`invalid direction : ${invalid}`);

      // π trick
      // λ§μ½ swtich/caseλ¬Έμμ κ±Έλ¦¬μ§ μλ κ°μ μ¬μ©νλ€λ©΄(μ λμΈ νμμ ν΄λΉνλ κ°μ μ¬μ©νμ§ μλ κ²½μ°),
      // ν΄λΉ νμκ³Ό neverνμμ΄ λ§μ§ μλλ€λ μ»΄νμΌ λ¨κ³μ μλ¬λ‘ μΈν΄μ μ΄λ₯Ό μμ ν  μ μλ€.
      // μ΄μ²λΌ μλ¬νΈλ€λ§μ ν΅ν΄μ μΌμ΄λ  κ°λ₯μ±μ΄ μλ μλ¬μ λν λλΉλ₯Ό ν΄μΌνλ€.
    }
  }
}
