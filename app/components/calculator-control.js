import Ember from "ember";
import inputValidator from "calculator/utils/input-validator";
import operatorFunctions from "calculator/utils/operator-functions";

export default Ember.Component.extend({
  inputs: "",
  inputValidator: inputValidator,
  operatorFunctions: operatorFunctions,
  getOperatorFunctions: function(){
    return operatorFunctions;
  },
  actions: {
    setInput: function(value) {
      if (this.get("inputValidator").isValid(this.get("inputs") + value)) {
        this.set("inputs", this.get("inputs") + value);
      }
    },

    applyOperator: function(operator) {
      if (this.get("total") === undefined){
        this.set("total", parseFloat(this.get("inputs")));
        this.set("inputs", "");
      }

      else if (this.get("appliedOperator") && this.get("inputs")){
        this.send("calculate");
      }

      this.set("appliedOperator", operator);
    },

    equals: function(){
      if (this.get("inputs")){
        this.send("calculate");
        this.set("inputs", "");
        this.set("appliedOperator", "");
      }
    },

    calculate: function(){
      var result = this.get("operatorFunctions")[this.get("appliedOperator")](this.get("total"), parseFloat(this.get("inputs")));
      this.set("total", result);
      this.set("inputs", "");
    },

    clear: function(){
      this.set("inputs", "");
      this.set("appliedOperator", "");
      this.set("total", undefined);
    }
  }
});