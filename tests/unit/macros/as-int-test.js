import Ember from 'ember';
import asInt from 'ember-cpm/macros/as-int';

var MyType = Ember.Object.extend({
  val: '6',
  intVal: 2,
  floatVal: 2.6,
  boolVal: true,
  nullVal: null,
  undefinedVal: undefined,
  valAsint: asInt('val'),
  boolAsInt: asInt('boolVal'),
  nullAsInt: asInt('nullValue'),
  undefinedAsInt: asInt('undefinedValue'),
  intValAsInt: asInt('intVal'),
  floatValAsInt: asInt('floatVal'),
  nonNumericStringAsInt: asInt('adas'),
  emptyStringAsInt: asInt(''),
});

var myObj;

module('asInt', {
  setup: function () {
    myObj = MyType.create();
  }
});

test('string prop - getting value as a int', function () {
  strictEqual(myObj.get('valAsint'), 6.0);
  myObj.set('val', '14');
  strictEqual(myObj.get('valAsint'), 14.0);
});

test('string prop - setting value as a int', function () {
  myObj.set('valAsint', 12.0);
  strictEqual(myObj.get('val'), '12');
});

test('numeric prop - getting value as a int', function () {
  strictEqual(myObj.get('intValAsInt'), 2);
  myObj.set('intVal', 14);
  strictEqual(myObj.get('intValAsInt'), 14);
});

test('numeric prop - setting value as a int', function () {
  myObj.set('intValAsInt', 13);
  strictEqual(myObj.get('intVal'), 13);
});

test('float prop - getting value as a int', function () {
  strictEqual(myObj.get('floatValAsInt'), 2);
});

test('null prop - getting value as a int', function () {
  strictEqual(myObj.get('nullAsInt').toString(), 'NaN');
});

test('undefined prop - getting value as a int', function () {
  strictEqual(myObj.get('undefinedAsInt').toString(), 'NaN');
});

test('string argument case', function () {
  equal(myObj.get('nonNumericStringAsInt').toString(), 'NaN', 'non-numeric string');
  equal(myObj.get('emptyStringAsInt').toString(), 'NaN', 'empty string');
});

test('boolean argument case', function () {
  strictEqual(myObj.get('boolAsInt'), 1, 'boolean true evaluates to 1');
  myObj.set('boolVal', false);
  strictEqual(myObj.get('boolAsInt'), 0, 'boolean false evaluates to 0');
  myObj.set('boolAsInt', 1);
  strictEqual(myObj.get('boolVal'), true);
  myObj.set('boolAsInt', 0);
  strictEqual(myObj.get('boolVal'), false);
});

test('Setting int value updates dependant string property', function () {
  myObj.set('valAsint', 3);
  strictEqual(myObj.get('val'), '3', 'string type of dependant property is respected');
});

test('Setting int value updates dependant int property', function () {
  myObj.set('intValAsInt', 111);
  strictEqual(myObj.get('intVal'), 111, 'int type of dependant property is respected');
});


test('zero-argument case throws an exception', function () {
  throws(function () {
    Ember.Object.extend({
      prop: asInt()
    });
  }, /No\sargument/);
});

test('null-argument case throws an exception', function () {
  throws(function () {
    Ember.Object.extend({
      prop: asInt(null)
    });
  }, /Null\sargument/);
});
