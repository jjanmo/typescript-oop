{
  type CoffeeCup = {
    shots: number;
    hasMilk: false;
    hasHazelnut: boolean;
    hasCaramel: boolean;
  };

  const BEANS_GRAM_PER_SHOT: number = 10; // 1샷당 필요한 커피콩 그램
  let coffeeBeans: number = 0; // 커피콩(그램)

  /***
   * @params shots : (만들) 커피에 들어갈 샷 수
   */
  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeans < shots * BEANS_GRAM_PER_SHOT) {
      throw new Error('not enouth coffee beans');
    }
    coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
      hasHazelnut: false,
      hasCaramel: false,
    };
  }

  coffeeBeans = 500;
  const myCoffee = makeCoffee(2);
  console.log(myCoffee);
}
