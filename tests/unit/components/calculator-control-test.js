import Ember from "ember";
import { test, moduleForComponent } from "ember-qunit";

moduleForComponent("calculator-control");

test("setInput with valid input with no previous inputs", function(){
  this.subject().getInputValidator = function(){
    return {
      isValid: function(){ return true; }
    };
  };
  this.subject().send("setInput", "1");
  equal(this.subject().get("inputs"), "1");
});

test("setInput with valid input with previous inputs", function(){
  this.subject().getInputValidator = function(){
    return {
      isValid: function(){ return true; }
    };
  };
  this.subject().set("inputs", "23");
  this.subject().send("setInput", "1");
  equal(this.subject().get("inputs"), "231");
});

test("setInput with invalid input with no previous inputs", function(){
  this.subject().getInputValidator = function(){
    return {
      isValid: function(){ return false; }
    };
  };
  this.subject().send("setInput", "1");
  equal(this.subject().get("inputs"), "");
});

test("applyOperator with no previous appliedOperator", function(){
  this.subject().send("applyOperator", "+");
  equal(this.subject().get("appliedOperator"), "+");
});

test("applyOperator with a previous appliedOperator and no inputs", function(){
  this.subject().set("appliedOperator", "*");
  this.subject().send("applyOperator", "+");
  equal(this.subject().get("appliedOperator"), "+");
});

test("applyOperator with no previous appliedOperator and no inputs", function(){
  this.subject().set("appliedOperator", "*");
  this.subject().send("applyOperator", "+");
  equal(this.subject().get("appliedOperator"), "+");
});

test("applyOperator with a previous appliedOperator with total and inputs", function(){
  var addWasCalled, multiplyWasCalled;
  this.subject().getOperatorFunctions = function(){
    return {
      "*": function (x, y) {
        multiplyWasCalled = {x: x, y: y};
        return 25;
      },
      "+": function (x, y) {
        addWasCalled = {x: x, y: y};
      }
    };
  };
  this.subject().set("total", 3);
  this.subject().set("appliedOperator", "*");
  this.subject().set("inputs", "2.1");
  this.subject().send("applyOperator", "+");
  equal(this.subject().get("appliedOperator"), "+");
  equal(multiplyWasCalled.x, 3);
  equal(multiplyWasCalled.y, 2.1);
  equal(this.subject().get("inputs"), "");
  equal(this.subject().get("total"), 25);
  equal(addWasCalled, undefined);
});

test("equals with a previous appliedOperator with total and inputs", function(){
  var multiplyWasCalled;
  this.subject().getOperatorFunctions = function(){
    return {
      "*": function (x, y) {
        multiplyWasCalled = {x: x, y: y};
        return 25;
      }
    };
  };
  this.subject().set("total", 3);
  this.subject().set("appliedOperator", "*");
  this.subject().set("inputs", "2.1");
  this.subject().send("equals");
  equal(this.subject().get("appliedOperator"), "");
  equal(multiplyWasCalled.x, 3);
  equal(multiplyWasCalled.y, 2.1);
  equal(this.subject().get("inputs"), "");
  equal(this.subject().get("total"), 25);
});

test("equals with a previous appliedOperator with total but no inputs", function(){
  var multiplyWasCalled;
  this.subject().getOperatorFunctions = function(){
    return {
      "*": function (x, y) {
        multiplyWasCalled = {x: x, y: y};
        return 25;
      }
    };
  };
  this.subject().set("total", 3);
  this.subject().set("appliedOperator", "*");
  this.subject().set("inputs", "");
  this.subject().send("equals");
  equal(this.subject().get("appliedOperator"), "*");
  equal(multiplyWasCalled, undefined);
  equal(this.subject().get("inputs"), "");
  equal(this.subject().get("total"), 3);
});

test("applyOperator with a previous appliedOperator with inputs but no total", function(){
  var addWasCalled, multiplyWasCalled;
  this.subject().getOperatorFunctions = function(){
    return {
      "*": function (x, y) {
        multiplyWasCalled = {x: x, y: y};
        return 25;
      },
      "+": function (x, y) {
        addWasCalled = {x: x, y: y};
      }
    };
  };
  this.subject().set("inputs", "2.1");
  this.subject().send("applyOperator", "+");
  equal(this.subject().get("inputs"), "");
  equal(this.subject().get("appliedOperator"), "+");
  equal(this.subject().get("total"), 2.1);
  equal(addWasCalled, undefined);
});

test("clear", function(){
  this.subject().set("total", 10);
  this.subject().set("applyOperator", "+");
  this.subject().set("inputs", "123");
  this.subject().send("clear");
  equal(this.subject().get("total"), undefined);
  equal(this.subject().get("appliedOperator"), "");
  equal(this.subject().get("inputs"), "");
});