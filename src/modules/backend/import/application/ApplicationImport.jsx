"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var react_redux_1 = require('react-redux');
// import { insertWarmupPractice, loadAllProblemsAndKnowledges, loadWarmupPracticeByPracticeUid } from "../async";
require('./ApplicationImport.less');
var ApplicationImport = (function (_super) {
    __extends(ApplicationImport, _super);
    function ApplicationImport() {
        _super.call(this);
        this.state = {
            problems: [],
            knowledges: [],
            knowledgesForSelect: [],
            showSnackBar: false
        };
    }
    ApplicationImport.prototype.componentWillMount = function () {
    };
    ApplicationImport.prototype.render = function () {
        return (<div className="practice-input-container">
        Hello
      </div>);
    };
    ApplicationImport = __decorate([
        react_redux_1.connect(function (state) { return state; })
    ], ApplicationImport);
    return ApplicationImport;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApplicationImport;
