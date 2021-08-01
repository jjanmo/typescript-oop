// import add, { log as print } from './10_3_module1.js';
import * as calculator from './10_3_module1.js';
// -> module1에서 export 되는 모든 것이 calculator라는 namespace안에 존재하게 되어 객체 프로퍼티처럼 사용이 가능해진다.

const result = calculator.add(calculator.number, 4);
calculator.log(result);
