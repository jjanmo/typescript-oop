class Car {
  engine: number = 0;
  move() {
    this.engine++;
    console.log('engine 🚀');
    console.log(this.engine);
  }
}

const car = new Car();
car.move();
