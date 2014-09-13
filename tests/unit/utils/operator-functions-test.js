import { test, moduleFor } from "ember-qunit";
import opertatorFunctions from "calculator/utils/operator-functions";

test("+", function(){
  equal(opertatorFunctions["+"](3, 2), 5);
  equal(opertatorFunctions["+"](5.4, 8.3), 13.7);
  equal(opertatorFunctions["+"](5.04, 8.03), 13.07);
});

test("*", function(){
  equal(opertatorFunctions["*"](3, 2), 6);
  equal(opertatorFunctions["*"](5.4, 8.3), 44.82);
  equal(opertatorFunctions["*"](5.04, 8.03), 40.4712);
});

test("/", function(){
  equal(opertatorFunctions["/"](3, 2), 1.5);
  equal(opertatorFunctions["/"](5.4, 8.3), 0.650602409639);
  equal(opertatorFunctions["/"](5.04, 8.03), 0.627646326276);
});

test("-", function(){
  equal(opertatorFunctions["-"](3, 2), 1);
  equal(opertatorFunctions["-"](5.4, 8.3), -2.9);
  equal(opertatorFunctions["-"](5.04, 8.03), -2.99);
});