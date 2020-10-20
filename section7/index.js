"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logging(message) {
    return function (target) {
        console.log(message);
        console.log(target);
    };
}
function Component(template, selector) {
    return function (constructor) {
        var mountedElement = document.querySelector(selector);
        var instance = new constructor(31);
        if (mountedElement) {
            mountedElement.innerHTML = template;
            mountedElement.querySelector('h1').textContent = instance.name;
        }
    };
}
var User = /** @class */ (function () {
    function User(age) {
        this.name = 'da';
        console.log('User was created!');
    }
    User = __decorate([
        Component('<h1>{{ name }}</h1>', '#app'),
        Logging('Logging')
    ], User);
    return User;
}());
// const user1 = new User();
