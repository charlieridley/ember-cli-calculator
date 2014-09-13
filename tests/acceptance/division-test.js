import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

module("Division tests", {
  setup: function() {
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test("Divide two integers", function() {
  visit("/");
  click("button:contains('3')");
  click("button:contains('/')");
  click("button:contains('4')");
  click("button:contains('=')");
  andThen(function() {
    equal(find(".total").text(), "0.75");
  });
});

test("Divide two decimals", function() {
  visit("/");
  click("button:contains('1')");
  click("button:contains('.')");
  click("button:contains('2')");
  click("button:contains('/')");
  click("button:contains('0')");
  click("button:contains('.')");
  click("button:contains('5')");
  click("button:contains('=')");
  andThen(function() {
    equal(find(".total").text(), "2.4");
  });
});