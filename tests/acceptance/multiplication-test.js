import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

module("Multiplication tests", {
  setup: function() {
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test("Multiply two integers", function() {
  visit("/");
  click("button:contains('3')");
  click("button:contains('*')");
  click("button:contains('4')");
  click("button:contains('=')");
  andThen(function() {
    equal(find(".total").text(), "12");
  });
});

test("Multiply two decimals", function() {
  visit("/");
  click("button:contains('3')");
  click("button:contains('.')");
  click("button:contains('2')");
  click("button:contains('*')");
  click("button:contains('4')");
  click("button:contains('.')");
  click("button:contains('4')");
  click("button:contains('=')");
  andThen(function() {
    equal(find(".total").text(), "14.08");
  });
});