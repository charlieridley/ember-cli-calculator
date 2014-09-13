import { test, moduleFor } from "ember-qunit";
import inputValidator from "calculator/utils/input-validator";

test("isValid is true if whole number entered", function(){
  ok(inputValidator.isValid("0"));
  ok(inputValidator.isValid("1"));
  ok(inputValidator.isValid("2"));
  ok(inputValidator.isValid("3"));
  ok(inputValidator.isValid("4"));
  ok(inputValidator.isValid("5"));
  ok(inputValidator.isValid("6"));
  ok(inputValidator.isValid("7"));
  ok(inputValidator.isValid("8"));
  ok(inputValidator.isValid("9"));
});

test("isValid is true if decimal entered", function(){
  ok(inputValidator.isValid("0."));
  ok(inputValidator.isValid("1."));
  ok(inputValidator.isValid("2."));
  ok(inputValidator.isValid("3."));
  ok(inputValidator.isValid("4."));
  ok(inputValidator.isValid("5."));
  ok(inputValidator.isValid("6."));
  ok(inputValidator.isValid("7."));
  ok(inputValidator.isValid("8."));
  ok(inputValidator.isValid("9."));
  ok(inputValidator.isValid("0.0"));
  ok(inputValidator.isValid("1.1"));
  ok(inputValidator.isValid("2.2"));
  ok(inputValidator.isValid("3.3"));
  ok(inputValidator.isValid("4.4"));
  ok(inputValidator.isValid("5.5"));
  ok(inputValidator.isValid("6.6"));
  ok(inputValidator.isValid("7.7"));
  ok(inputValidator.isValid("8.8"));
  ok(inputValidator.isValid("9.9"));
});

test("isValid is false if more than one point is entered", function(){
  equal(inputValidator.isValid("0.."), false);
  equal(inputValidator.isValid("0.0."), false);
  equal(inputValidator.isValid(".0."), false);
  equal(inputValidator.isValid(".."), false);
});