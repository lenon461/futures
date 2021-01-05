/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const platform_ws_1 = __webpack_require__(44);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useWebSocketAdapter(new platform_ws_1.WsAdapter(app));
    app.enableCors();
    await app.listen(3000);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");;

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const chart_module_1 = __webpack_require__(4);
const events_module_1 = __webpack_require__(11);
const summoners_module_1 = __webpack_require__(15);
const points_module_1 = __webpack_require__(24);
const orders_module_1 = __webpack_require__(30);
const bull_1 = __webpack_require__(38);
const processor_module_1 = __webpack_require__(42);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            processor_module_1.ProcessorModule, orders_module_1.OrdersModule,
            chart_module_1.ChartModule, events_module_1.EventsModule, summoners_module_1.SummonersModule, points_module_1.PointsModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");;

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChartModule = void 0;
const common_1 = __webpack_require__(3);
const chart_controller_1 = __webpack_require__(5);
const chart_service_1 = __webpack_require__(6);
let ChartModule = class ChartModule {
};
ChartModule = __decorate([
    common_1.Module({
        controllers: [chart_controller_1.ChartController],
        providers: [chart_service_1.ChartService],
    })
], ChartModule);
exports.ChartModule = ChartModule;


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChartController = void 0;
const common_1 = __webpack_require__(3);
const chart_service_1 = __webpack_require__(6);
let ChartController = class ChartController {
    constructor(chartService) {
        this.chartService = chartService;
    }
    getCandles(query) {
        const feed = this.chartService.getCandles(query);
        return JSON.stringify(feed);
    }
    getLP(query) {
        const feed = this.chartService.getData(Object.assign({ name: 'lp', type: 'line' }, query));
        return JSON.stringify(feed);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], ChartController.prototype, "getCandles", null);
__decorate([
    common_1.Get('lp'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], ChartController.prototype, "getLP", null);
ChartController = __decorate([
    common_1.Controller('chart'),
    __metadata("design:paramtypes", [typeof (_a = typeof chart_service_1.ChartService !== "undefined" && chart_service_1.ChartService) === "function" ? _a : Object])
], ChartController);
exports.ChartController = ChartController;


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChartService = void 0;
const common_1 = __webpack_require__(3);
const moment = __webpack_require__(7);
const _ = __webpack_require__(8);
const stub_1 = __webpack_require__(9);
let ChartService = class ChartService {
    getCandles(options) {
        const default_options = {
            from: moment().subtract(30, 'days').valueOf(),
            to: moment().valueOf()
        };
        options.from = options.from ? (options.from) : default_options.from;
        options.to = options.to ? (options.to) : default_options.to;
        if (options.time)
            return this.updateStub((options.time));
        return this.makeInitStub(options);
    }
    makeInitStub(options) {
        const from = moment(parseInt(options.from));
        const to = moment(parseInt(options.to));
        const feeds = [];
        let time = from;
        while (time <= to) {
            feeds.push(this.makeRandomFeed(time.format("YYYY-MM-DD")));
            time = time.add(1, 'days');
        }
        console.log(JSON.stringify(feeds.slice(0, 20)));
        return feeds;
    }
    updateStub(timestamp) {
        const time = moment(timestamp);
        return [this.makeRandomFeed(time.format("YYYY-MM-DD"))];
    }
    makeRandomFeed(time, base, ns) {
        const basePrice = base || 60;
        const noiseStrength = ns || 0.1;
        const noise = 0.1 - Math.random() * noiseStrength + 1.0;
        const delta = 0.7 * (1 + Math.random());
        const noisedPrice = basePrice * noise;
        const deltadPrice = noisedPrice * delta;
        return { time, open: noisedPrice, high: noisedPrice, low: deltadPrice, close: deltadPrice };
    }
    getData(params) {
        const { name, type, count = 200, to } = params;
        const data = _.orderBy(stub_1.default[name].data, ['time'], ['asc']);
        const returnData = [];
        if (!to)
            return data.slice(300, 500);
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (index == count)
                break;
            if (to && moment(to).valueOf() > moment(element.time).valueOf())
                continue;
            returnData.push(element);
        }
        return returnData;
    }
};
ChartService = __decorate([
    common_1.Injectable()
], ChartService);
exports.ChartService = ChartService;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("moment");;

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("lodash");;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const lp = __webpack_require__(10);
const Stub = {
    lp
};
exports.default = Stub;


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = JSON.parse("{\"data\":[{\"time\":\"2019-07-08\",\"value\":109},{\"time\":\"2019-07-09\",\"value\":109},{\"time\":\"2019-07-10\",\"value\":105},{\"time\":\"2019-07-11\",\"value\":105},{\"time\":\"2019-07-12\",\"value\":95},{\"time\":\"2019-07-13\",\"value\":100},{\"time\":\"2019-07-14\",\"value\":90},{\"time\":\"2019-07-15\",\"value\":100},{\"time\":\"2019-07-16\",\"value\":91},{\"time\":\"2019-07-17\",\"value\":103},{\"time\":\"2019-07-18\",\"value\":96},{\"time\":\"2019-07-19\",\"value\":108},{\"time\":\"2019-07-20\",\"value\":102},{\"time\":\"2019-07-21\",\"value\":91},{\"time\":\"2019-07-22\",\"value\":108},{\"time\":\"2019-07-23\",\"value\":92},{\"time\":\"2019-07-24\",\"value\":100},{\"time\":\"2019-07-25\",\"value\":94},{\"time\":\"2019-07-26\",\"value\":102},{\"time\":\"2019-07-27\",\"value\":90},{\"time\":\"2019-07-28\",\"value\":104},{\"time\":\"2019-07-29\",\"value\":100},{\"time\":\"2019-07-30\",\"value\":110},{\"time\":\"2019-07-31\",\"value\":106},{\"time\":\"2019-08-01\",\"value\":101},{\"time\":\"2019-08-02\",\"value\":109},{\"time\":\"2019-08-03\",\"value\":95},{\"time\":\"2019-08-04\",\"value\":105},{\"time\":\"2019-08-05\",\"value\":90},{\"time\":\"2019-08-06\",\"value\":103},{\"time\":\"2019-08-07\",\"value\":109},{\"time\":\"2019-08-08\",\"value\":106},{\"time\":\"2019-08-09\",\"value\":107},{\"time\":\"2019-08-10\",\"value\":95},{\"time\":\"2019-08-11\",\"value\":97},{\"time\":\"2019-08-12\",\"value\":100},{\"time\":\"2019-08-13\",\"value\":108},{\"time\":\"2019-08-14\",\"value\":97},{\"time\":\"2019-08-15\",\"value\":96},{\"time\":\"2019-08-16\",\"value\":103},{\"time\":\"2019-08-17\",\"value\":100},{\"time\":\"2019-08-18\",\"value\":92},{\"time\":\"2019-08-19\",\"value\":95},{\"time\":\"2019-08-20\",\"value\":104},{\"time\":\"2019-08-21\",\"value\":108},{\"time\":\"2019-08-22\",\"value\":95},{\"time\":\"2019-08-23\",\"value\":99},{\"time\":\"2019-08-24\",\"value\":95},{\"time\":\"2019-08-25\",\"value\":91},{\"time\":\"2019-08-26\",\"value\":95},{\"time\":\"2019-08-27\",\"value\":92},{\"time\":\"2019-08-28\",\"value\":96},{\"time\":\"2019-08-29\",\"value\":91},{\"time\":\"2019-08-30\",\"value\":99},{\"time\":\"2019-08-31\",\"value\":105},{\"time\":\"2019-09-01\",\"value\":91},{\"time\":\"2019-09-02\",\"value\":98},{\"time\":\"2019-09-03\",\"value\":102},{\"time\":\"2019-09-04\",\"value\":100},{\"time\":\"2019-09-05\",\"value\":99},{\"time\":\"2019-09-06\",\"value\":95},{\"time\":\"2019-09-07\",\"value\":93},{\"time\":\"2019-09-08\",\"value\":106},{\"time\":\"2019-09-09\",\"value\":108},{\"time\":\"2019-09-10\",\"value\":101},{\"time\":\"2019-09-11\",\"value\":106},{\"time\":\"2019-09-12\",\"value\":95},{\"time\":\"2019-09-13\",\"value\":100},{\"time\":\"2019-09-14\",\"value\":93},{\"time\":\"2019-09-15\",\"value\":103},{\"time\":\"2019-09-16\",\"value\":97},{\"time\":\"2019-09-17\",\"value\":103},{\"time\":\"2019-09-18\",\"value\":91},{\"time\":\"2019-09-19\",\"value\":103},{\"time\":\"2019-09-20\",\"value\":99},{\"time\":\"2019-09-21\",\"value\":95},{\"time\":\"2019-09-22\",\"value\":102},{\"time\":\"2019-09-23\",\"value\":102},{\"time\":\"2019-09-24\",\"value\":96},{\"time\":\"2019-09-25\",\"value\":103},{\"time\":\"2019-09-26\",\"value\":102},{\"time\":\"2019-09-27\",\"value\":108},{\"time\":\"2019-09-28\",\"value\":107},{\"time\":\"2019-09-29\",\"value\":91},{\"time\":\"2019-09-30\",\"value\":108},{\"time\":\"2019-10-01\",\"value\":107},{\"time\":\"2019-10-02\",\"value\":98},{\"time\":\"2019-10-03\",\"value\":93},{\"time\":\"2019-10-04\",\"value\":110},{\"time\":\"2019-10-05\",\"value\":92},{\"time\":\"2019-10-06\",\"value\":106},{\"time\":\"2019-10-07\",\"value\":108},{\"time\":\"2019-10-08\",\"value\":92},{\"time\":\"2019-10-09\",\"value\":98},{\"time\":\"2019-10-10\",\"value\":105},{\"time\":\"2019-10-11\",\"value\":98},{\"time\":\"2019-10-12\",\"value\":95},{\"time\":\"2019-10-13\",\"value\":92},{\"time\":\"2019-10-14\",\"value\":107},{\"time\":\"2019-10-15\",\"value\":101},{\"time\":\"2019-10-16\",\"value\":108},{\"time\":\"2019-10-17\",\"value\":104},{\"time\":\"2019-10-18\",\"value\":104},{\"time\":\"2019-10-19\",\"value\":106},{\"time\":\"2019-10-20\",\"value\":109},{\"time\":\"2019-10-21\",\"value\":98},{\"time\":\"2019-10-22\",\"value\":104},{\"time\":\"2019-10-23\",\"value\":97},{\"time\":\"2019-10-24\",\"value\":108},{\"time\":\"2019-10-25\",\"value\":90},{\"time\":\"2019-10-26\",\"value\":93},{\"time\":\"2019-10-27\",\"value\":98},{\"time\":\"2019-10-28\",\"value\":96},{\"time\":\"2019-10-29\",\"value\":103},{\"time\":\"2019-10-30\",\"value\":106},{\"time\":\"2019-10-31\",\"value\":94},{\"time\":\"2019-11-01\",\"value\":99},{\"time\":\"2019-11-02\",\"value\":110},{\"time\":\"2019-11-03\",\"value\":100},{\"time\":\"2019-11-04\",\"value\":108},{\"time\":\"2019-11-05\",\"value\":92},{\"time\":\"2019-11-06\",\"value\":109},{\"time\":\"2019-11-07\",\"value\":108},{\"time\":\"2019-11-08\",\"value\":95},{\"time\":\"2019-11-09\",\"value\":94},{\"time\":\"2019-11-10\",\"value\":94},{\"time\":\"2019-11-11\",\"value\":102},{\"time\":\"2019-11-12\",\"value\":98},{\"time\":\"2019-11-13\",\"value\":108},{\"time\":\"2019-11-14\",\"value\":95},{\"time\":\"2019-11-15\",\"value\":105},{\"time\":\"2019-11-16\",\"value\":102},{\"time\":\"2019-11-17\",\"value\":108},{\"time\":\"2019-11-18\",\"value\":101},{\"time\":\"2019-11-19\",\"value\":94},{\"time\":\"2019-11-20\",\"value\":110},{\"time\":\"2019-11-21\",\"value\":100},{\"time\":\"2019-11-22\",\"value\":110},{\"time\":\"2019-11-23\",\"value\":105},{\"time\":\"2019-11-24\",\"value\":101},{\"time\":\"2019-11-25\",\"value\":102},{\"time\":\"2019-11-26\",\"value\":101},{\"time\":\"2019-11-27\",\"value\":110},{\"time\":\"2019-11-28\",\"value\":106},{\"time\":\"2019-11-29\",\"value\":105},{\"time\":\"2019-11-30\",\"value\":100},{\"time\":\"2019-12-01\",\"value\":104},{\"time\":\"2019-12-02\",\"value\":92},{\"time\":\"2019-12-03\",\"value\":90},{\"time\":\"2019-12-04\",\"value\":104},{\"time\":\"2019-12-05\",\"value\":110},{\"time\":\"2019-12-06\",\"value\":103},{\"time\":\"2019-12-07\",\"value\":104},{\"time\":\"2019-12-08\",\"value\":101},{\"time\":\"2019-12-09\",\"value\":95},{\"time\":\"2019-12-10\",\"value\":92},{\"time\":\"2019-12-11\",\"value\":99},{\"time\":\"2019-12-12\",\"value\":95},{\"time\":\"2019-12-13\",\"value\":95},{\"time\":\"2019-12-14\",\"value\":96},{\"time\":\"2019-12-15\",\"value\":109},{\"time\":\"2019-12-16\",\"value\":107},{\"time\":\"2019-12-17\",\"value\":98},{\"time\":\"2019-12-18\",\"value\":106},{\"time\":\"2019-12-19\",\"value\":106},{\"time\":\"2019-12-20\",\"value\":101},{\"time\":\"2019-12-21\",\"value\":110},{\"time\":\"2019-12-22\",\"value\":91},{\"time\":\"2019-12-23\",\"value\":91},{\"time\":\"2019-12-24\",\"value\":91},{\"time\":\"2019-12-25\",\"value\":93},{\"time\":\"2019-12-26\",\"value\":99},{\"time\":\"2019-12-27\",\"value\":109},{\"time\":\"2019-12-28\",\"value\":105},{\"time\":\"2019-12-29\",\"value\":94},{\"time\":\"2019-12-30\",\"value\":96},{\"time\":\"2019-12-31\",\"value\":103},{\"time\":\"2020-01-01\",\"value\":107},{\"time\":\"2020-01-02\",\"value\":107},{\"time\":\"2020-01-03\",\"value\":92},{\"time\":\"2020-01-04\",\"value\":104},{\"time\":\"2020-01-05\",\"value\":99},{\"time\":\"2020-01-06\",\"value\":103},{\"time\":\"2020-01-07\",\"value\":106},{\"time\":\"2020-01-08\",\"value\":104},{\"time\":\"2020-01-09\",\"value\":93},{\"time\":\"2020-01-10\",\"value\":95},{\"time\":\"2020-01-11\",\"value\":99},{\"time\":\"2020-01-12\",\"value\":107},{\"time\":\"2020-01-13\",\"value\":107},{\"time\":\"2020-01-14\",\"value\":106},{\"time\":\"2020-01-15\",\"value\":106},{\"time\":\"2020-01-16\",\"value\":98},{\"time\":\"2020-01-17\",\"value\":101},{\"time\":\"2020-01-18\",\"value\":93},{\"time\":\"2020-01-19\",\"value\":92},{\"time\":\"2020-01-20\",\"value\":105},{\"time\":\"2020-01-21\",\"value\":90},{\"time\":\"2020-01-22\",\"value\":94},{\"time\":\"2020-01-23\",\"value\":98},{\"time\":\"2020-01-24\",\"value\":101},{\"time\":\"2020-01-25\",\"value\":106},{\"time\":\"2020-01-26\",\"value\":106},{\"time\":\"2020-01-27\",\"value\":94},{\"time\":\"2020-01-28\",\"value\":102},{\"time\":\"2020-01-29\",\"value\":96},{\"time\":\"2020-01-30\",\"value\":100},{\"time\":\"2020-01-31\",\"value\":93},{\"time\":\"2020-02-01\",\"value\":98},{\"time\":\"2020-02-02\",\"value\":103},{\"time\":\"2020-02-03\",\"value\":96},{\"time\":\"2020-02-04\",\"value\":93},{\"time\":\"2020-02-05\",\"value\":90},{\"time\":\"2020-02-06\",\"value\":93},{\"time\":\"2020-02-07\",\"value\":100},{\"time\":\"2020-02-08\",\"value\":93},{\"time\":\"2020-02-09\",\"value\":107},{\"time\":\"2020-02-10\",\"value\":96},{\"time\":\"2020-02-11\",\"value\":96},{\"time\":\"2020-02-12\",\"value\":98},{\"time\":\"2020-02-13\",\"value\":100},{\"time\":\"2020-02-14\",\"value\":91},{\"time\":\"2020-02-15\",\"value\":96},{\"time\":\"2020-02-16\",\"value\":91},{\"time\":\"2020-02-17\",\"value\":96},{\"time\":\"2020-02-18\",\"value\":91},{\"time\":\"2020-02-19\",\"value\":109},{\"time\":\"2020-02-20\",\"value\":99},{\"time\":\"2020-02-21\",\"value\":106},{\"time\":\"2020-02-22\",\"value\":94},{\"time\":\"2020-02-23\",\"value\":100},{\"time\":\"2020-02-24\",\"value\":106},{\"time\":\"2020-02-25\",\"value\":92},{\"time\":\"2020-02-26\",\"value\":99},{\"time\":\"2020-02-27\",\"value\":96},{\"time\":\"2020-02-28\",\"value\":109},{\"time\":\"2020-02-29\",\"value\":105},{\"time\":\"2020-03-01\",\"value\":97},{\"time\":\"2020-03-02\",\"value\":104},{\"time\":\"2020-03-03\",\"value\":108},{\"time\":\"2020-03-04\",\"value\":108},{\"time\":\"2020-03-05\",\"value\":92},{\"time\":\"2020-03-06\",\"value\":104},{\"time\":\"2020-03-07\",\"value\":108},{\"time\":\"2020-03-08\",\"value\":94},{\"time\":\"2020-03-09\",\"value\":101},{\"time\":\"2020-03-10\",\"value\":92},{\"time\":\"2020-03-11\",\"value\":98},{\"time\":\"2020-03-12\",\"value\":97},{\"time\":\"2020-03-13\",\"value\":97},{\"time\":\"2020-03-14\",\"value\":100},{\"time\":\"2020-03-15\",\"value\":93},{\"time\":\"2020-03-16\",\"value\":99},{\"time\":\"2020-03-17\",\"value\":104},{\"time\":\"2020-03-18\",\"value\":107},{\"time\":\"2020-03-19\",\"value\":99},{\"time\":\"2020-03-20\",\"value\":108},{\"time\":\"2020-03-21\",\"value\":102},{\"time\":\"2020-03-22\",\"value\":103},{\"time\":\"2020-03-23\",\"value\":107},{\"time\":\"2020-03-24\",\"value\":97},{\"time\":\"2020-03-25\",\"value\":93},{\"time\":\"2020-03-26\",\"value\":110},{\"time\":\"2020-03-27\",\"value\":92},{\"time\":\"2020-03-28\",\"value\":99},{\"time\":\"2020-03-29\",\"value\":101},{\"time\":\"2020-03-30\",\"value\":104},{\"time\":\"2020-03-31\",\"value\":102},{\"time\":\"2020-04-01\",\"value\":95},{\"time\":\"2020-04-02\",\"value\":107},{\"time\":\"2020-04-03\",\"value\":90},{\"time\":\"2020-04-04\",\"value\":108},{\"time\":\"2020-04-05\",\"value\":104},{\"time\":\"2020-04-06\",\"value\":104},{\"time\":\"2020-04-07\",\"value\":98},{\"time\":\"2020-04-08\",\"value\":103},{\"time\":\"2020-04-09\",\"value\":95},{\"time\":\"2020-04-10\",\"value\":91},{\"time\":\"2020-04-11\",\"value\":105},{\"time\":\"2020-04-12\",\"value\":91},{\"time\":\"2020-04-13\",\"value\":91},{\"time\":\"2020-04-14\",\"value\":103},{\"time\":\"2020-04-15\",\"value\":97},{\"time\":\"2020-04-16\",\"value\":109},{\"time\":\"2020-04-17\",\"value\":99},{\"time\":\"2020-04-18\",\"value\":107},{\"time\":\"2020-04-19\",\"value\":92},{\"time\":\"2020-04-20\",\"value\":103},{\"time\":\"2020-04-21\",\"value\":106},{\"time\":\"2020-04-22\",\"value\":105},{\"time\":\"2020-04-23\",\"value\":98},{\"time\":\"2020-04-24\",\"value\":95},{\"time\":\"2020-04-25\",\"value\":107},{\"time\":\"2020-04-26\",\"value\":95},{\"time\":\"2020-04-27\",\"value\":92},{\"time\":\"2020-04-28\",\"value\":90},{\"time\":\"2020-04-29\",\"value\":109},{\"time\":\"2020-04-30\",\"value\":97},{\"time\":\"2020-05-01\",\"value\":108},{\"time\":\"2020-05-02\",\"value\":108},{\"time\":\"2020-05-03\",\"value\":101},{\"time\":\"2020-05-04\",\"value\":107},{\"time\":\"2020-05-05\",\"value\":97},{\"time\":\"2020-05-06\",\"value\":91},{\"time\":\"2020-05-07\",\"value\":92},{\"time\":\"2020-05-08\",\"value\":102},{\"time\":\"2020-05-09\",\"value\":109},{\"time\":\"2020-05-10\",\"value\":94},{\"time\":\"2020-05-11\",\"value\":104},{\"time\":\"2020-05-12\",\"value\":100},{\"time\":\"2020-05-13\",\"value\":95},{\"time\":\"2020-05-14\",\"value\":103},{\"time\":\"2020-05-15\",\"value\":108},{\"time\":\"2020-05-16\",\"value\":94},{\"time\":\"2020-05-17\",\"value\":106},{\"time\":\"2020-05-18\",\"value\":94},{\"time\":\"2020-05-19\",\"value\":102},{\"time\":\"2020-05-20\",\"value\":109},{\"time\":\"2020-05-21\",\"value\":99},{\"time\":\"2020-05-22\",\"value\":104},{\"time\":\"2020-05-23\",\"value\":105},{\"time\":\"2020-05-24\",\"value\":94},{\"time\":\"2020-05-25\",\"value\":109},{\"time\":\"2020-05-26\",\"value\":101},{\"time\":\"2020-05-27\",\"value\":95},{\"time\":\"2020-05-28\",\"value\":108},{\"time\":\"2020-05-29\",\"value\":105},{\"time\":\"2020-05-30\",\"value\":96},{\"time\":\"2020-05-31\",\"value\":92},{\"time\":\"2020-06-01\",\"value\":92},{\"time\":\"2020-06-02\",\"value\":109},{\"time\":\"2020-06-03\",\"value\":94},{\"time\":\"2020-06-04\",\"value\":108},{\"time\":\"2020-06-05\",\"value\":108},{\"time\":\"2020-06-06\",\"value\":99},{\"time\":\"2020-06-07\",\"value\":107},{\"time\":\"2020-06-08\",\"value\":109},{\"time\":\"2020-06-09\",\"value\":100},{\"time\":\"2020-06-10\",\"value\":104},{\"time\":\"2020-06-11\",\"value\":93},{\"time\":\"2020-06-12\",\"value\":110},{\"time\":\"2020-06-13\",\"value\":95},{\"time\":\"2020-06-14\",\"value\":94},{\"time\":\"2020-06-15\",\"value\":97},{\"time\":\"2020-06-16\",\"value\":108},{\"time\":\"2020-06-17\",\"value\":106},{\"time\":\"2020-06-18\",\"value\":97},{\"time\":\"2020-06-19\",\"value\":91},{\"time\":\"2020-06-20\",\"value\":95},{\"time\":\"2020-06-21\",\"value\":93},{\"time\":\"2020-06-22\",\"value\":100},{\"time\":\"2020-06-23\",\"value\":103},{\"time\":\"2020-06-24\",\"value\":99},{\"time\":\"2020-06-25\",\"value\":108},{\"time\":\"2020-06-26\",\"value\":102},{\"time\":\"2020-06-27\",\"value\":92},{\"time\":\"2020-06-28\",\"value\":97},{\"time\":\"2020-06-29\",\"value\":93},{\"time\":\"2020-06-30\",\"value\":104},{\"time\":\"2020-07-01\",\"value\":92},{\"time\":\"2020-07-02\",\"value\":108},{\"time\":\"2020-07-03\",\"value\":105},{\"time\":\"2020-07-04\",\"value\":105},{\"time\":\"2020-07-05\",\"value\":92},{\"time\":\"2020-07-06\",\"value\":92},{\"time\":\"2020-07-07\",\"value\":107},{\"time\":\"2020-07-08\",\"value\":95},{\"time\":\"2020-07-09\",\"value\":96},{\"time\":\"2020-07-10\",\"value\":99},{\"time\":\"2020-07-11\",\"value\":95},{\"time\":\"2020-07-12\",\"value\":93},{\"time\":\"2020-07-13\",\"value\":98},{\"time\":\"2020-07-14\",\"value\":96},{\"time\":\"2020-07-15\",\"value\":95},{\"time\":\"2020-07-16\",\"value\":101},{\"time\":\"2020-07-17\",\"value\":102},{\"time\":\"2020-07-18\",\"value\":102},{\"time\":\"2020-07-19\",\"value\":94},{\"time\":\"2020-07-20\",\"value\":92},{\"time\":\"2020-07-21\",\"value\":91},{\"time\":\"2020-07-22\",\"value\":109},{\"time\":\"2020-07-23\",\"value\":106},{\"time\":\"2020-07-24\",\"value\":102},{\"time\":\"2020-07-25\",\"value\":105},{\"time\":\"2020-07-26\",\"value\":90},{\"time\":\"2020-07-27\",\"value\":94},{\"time\":\"2020-07-28\",\"value\":96},{\"time\":\"2020-07-29\",\"value\":107},{\"time\":\"2020-07-30\",\"value\":103},{\"time\":\"2020-07-31\",\"value\":101},{\"time\":\"2020-08-01\",\"value\":109},{\"time\":\"2020-08-02\",\"value\":96},{\"time\":\"2020-08-03\",\"value\":105},{\"time\":\"2020-08-04\",\"value\":91},{\"time\":\"2020-08-05\",\"value\":93},{\"time\":\"2020-08-06\",\"value\":96},{\"time\":\"2020-08-07\",\"value\":102},{\"time\":\"2020-08-08\",\"value\":95},{\"time\":\"2020-08-09\",\"value\":92},{\"time\":\"2020-08-10\",\"value\":107},{\"time\":\"2020-08-11\",\"value\":96},{\"time\":\"2020-08-12\",\"value\":106},{\"time\":\"2020-08-13\",\"value\":107},{\"time\":\"2020-08-14\",\"value\":100},{\"time\":\"2020-08-15\",\"value\":106},{\"time\":\"2020-08-16\",\"value\":95},{\"time\":\"2020-08-17\",\"value\":91},{\"time\":\"2020-08-18\",\"value\":101},{\"time\":\"2020-08-19\",\"value\":96},{\"time\":\"2020-08-20\",\"value\":92},{\"time\":\"2020-08-21\",\"value\":105},{\"time\":\"2020-08-22\",\"value\":91},{\"time\":\"2020-08-23\",\"value\":92},{\"time\":\"2020-08-24\",\"value\":104},{\"time\":\"2020-08-25\",\"value\":109},{\"time\":\"2020-08-26\",\"value\":105},{\"time\":\"2020-08-27\",\"value\":100},{\"time\":\"2020-08-28\",\"value\":110},{\"time\":\"2020-08-29\",\"value\":91},{\"time\":\"2020-08-30\",\"value\":100},{\"time\":\"2020-08-31\",\"value\":96},{\"time\":\"2020-09-01\",\"value\":99},{\"time\":\"2020-09-02\",\"value\":109},{\"time\":\"2020-09-03\",\"value\":108},{\"time\":\"2020-09-04\",\"value\":92},{\"time\":\"2020-09-05\",\"value\":95},{\"time\":\"2020-09-06\",\"value\":108},{\"time\":\"2020-09-07\",\"value\":110},{\"time\":\"2020-09-08\",\"value\":98},{\"time\":\"2020-09-09\",\"value\":96},{\"time\":\"2020-09-10\",\"value\":101},{\"time\":\"2020-09-11\",\"value\":105},{\"time\":\"2020-09-12\",\"value\":100},{\"time\":\"2020-09-13\",\"value\":93},{\"time\":\"2020-09-14\",\"value\":90},{\"time\":\"2020-09-15\",\"value\":99},{\"time\":\"2020-09-16\",\"value\":90},{\"time\":\"2020-09-17\",\"value\":103},{\"time\":\"2020-09-18\",\"value\":97},{\"time\":\"2020-09-19\",\"value\":97},{\"time\":\"2020-09-20\",\"value\":102},{\"time\":\"2020-09-21\",\"value\":97},{\"time\":\"2020-09-22\",\"value\":90},{\"time\":\"2020-09-23\",\"value\":105},{\"time\":\"2020-09-24\",\"value\":107},{\"time\":\"2020-09-25\",\"value\":106},{\"time\":\"2020-09-26\",\"value\":105},{\"time\":\"2020-09-27\",\"value\":94},{\"time\":\"2020-09-28\",\"value\":92},{\"time\":\"2020-09-29\",\"value\":103},{\"time\":\"2020-09-30\",\"value\":109},{\"time\":\"2020-10-01\",\"value\":91},{\"time\":\"2020-10-02\",\"value\":97},{\"time\":\"2020-10-03\",\"value\":90},{\"time\":\"2020-10-04\",\"value\":94},{\"time\":\"2020-10-05\",\"value\":103},{\"time\":\"2020-10-06\",\"value\":97},{\"time\":\"2020-10-07\",\"value\":106},{\"time\":\"2020-10-08\",\"value\":92},{\"time\":\"2020-10-09\",\"value\":109},{\"time\":\"2020-10-10\",\"value\":98},{\"time\":\"2020-10-11\",\"value\":108},{\"time\":\"2020-10-12\",\"value\":98},{\"time\":\"2020-10-13\",\"value\":96},{\"time\":\"2020-10-14\",\"value\":93},{\"time\":\"2020-10-15\",\"value\":106},{\"time\":\"2020-10-16\",\"value\":99},{\"time\":\"2020-10-17\",\"value\":103},{\"time\":\"2020-10-18\",\"value\":106},{\"time\":\"2020-10-19\",\"value\":110},{\"time\":\"2020-10-20\",\"value\":106},{\"time\":\"2020-10-21\",\"value\":97},{\"time\":\"2020-10-22\",\"value\":101},{\"time\":\"2020-10-23\",\"value\":94},{\"time\":\"2020-10-24\",\"value\":106},{\"time\":\"2020-10-25\",\"value\":108},{\"time\":\"2020-10-26\",\"value\":101},{\"time\":\"2020-10-27\",\"value\":103},{\"time\":\"2020-10-28\",\"value\":108},{\"time\":\"2020-10-29\",\"value\":99},{\"time\":\"2020-10-30\",\"value\":102},{\"time\":\"2020-10-31\",\"value\":108},{\"time\":\"2020-11-01\",\"value\":103},{\"time\":\"2020-11-02\",\"value\":97},{\"time\":\"2020-11-03\",\"value\":108},{\"time\":\"2020-11-04\",\"value\":106},{\"time\":\"2020-11-05\",\"value\":95},{\"time\":\"2020-11-06\",\"value\":102},{\"time\":\"2020-11-07\",\"value\":102},{\"time\":\"2020-11-08\",\"value\":97},{\"time\":\"2020-11-09\",\"value\":100},{\"time\":\"2020-11-10\",\"value\":93},{\"time\":\"2020-11-11\",\"value\":97},{\"time\":\"2020-11-12\",\"value\":108},{\"time\":\"2020-11-13\",\"value\":104},{\"time\":\"2020-11-14\",\"value\":99},{\"time\":\"2020-11-15\",\"value\":98},{\"time\":\"2020-11-16\",\"value\":104},{\"time\":\"2020-11-17\",\"value\":91},{\"time\":\"2020-11-18\",\"value\":106}]}");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsModule = void 0;
const common_1 = __webpack_require__(3);
const events_gateway_1 = __webpack_require__(12);
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    common_1.Module({
        providers: [events_gateway_1.EventsGateway],
    })
], EventsModule);
exports.EventsModule = EventsModule;


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsGateway = void 0;
const websockets_1 = __webpack_require__(13);
const ws_1 = __webpack_require__(14);
const moment = __webpack_require__(7);
let EventsGateway = class EventsGateway {
    afterInit(server) {
        console.log('   Socket is Running on \n\t8090 port');
    }
    handleConnection(client, ...args) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    onEvent(client, data) {
        const { count } = data;
        const bar = { "time": moment().add(count || 0, 'days').format('YYYY-MM-DD'), "value": 108 };
        return { event: "Faker@kline", data: bar };
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof ws_1.Server !== "undefined" && ws_1.Server) === "function" ? _a : Object)
], EventsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage(`Faker@kline`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_b = typeof websockets_1.WsResponse !== "undefined" && websockets_1.WsResponse) === "function" ? _b : Object)
], EventsGateway.prototype, "onEvent", null);
EventsGateway = __decorate([
    websockets_1.WebSocketGateway(8090)
], EventsGateway);
exports.EventsGateway = EventsGateway;


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");;

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("ws");;

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonersModule = void 0;
const common_1 = __webpack_require__(3);
const summoners_controller_1 = __webpack_require__(16);
const summoners_provider_1 = __webpack_require__(20);
const summoners_service_1 = __webpack_require__(18);
const database_module_1 = __webpack_require__(22);
let SummonersModule = class SummonersModule {
};
SummonersModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [summoners_controller_1.SummonersController],
        providers: [summoners_service_1.SummonersService, ...summoners_provider_1.summonersProviders]
    })
], SummonersModule);
exports.SummonersModule = SummonersModule;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonersController = void 0;
const common_1 = __webpack_require__(3);
const create_summoner_dto_1 = __webpack_require__(17);
const summoners_service_1 = __webpack_require__(18);
let SummonersController = class SummonersController {
    constructor(summonersService) {
        this.summonersService = summonersService;
    }
    async create(createSummonerDto) {
        console.log(createSummonerDto);
        this.summonersService.create(createSummonerDto);
    }
    async findAll() {
        return this.summonersService.findAll();
    }
    async findbyName(name) {
        return this.summonersService.findOne(name);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_summoner_dto_1.CreateSummonerDto !== "undefined" && create_summoner_dto_1.CreateSummonerDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], SummonersController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], SummonersController.prototype, "findAll", null);
__decorate([
    common_1.Get('by-name/:name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SummonersController.prototype, "findbyName", null);
SummonersController = __decorate([
    common_1.Controller('summoners'),
    __metadata("design:paramtypes", [typeof (_d = typeof summoners_service_1.SummonersService !== "undefined" && summoners_service_1.SummonersService) === "function" ? _d : Object])
], SummonersController);
exports.SummonersController = SummonersController;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSummonerDto = void 0;
class CreateSummonerDto {
}
exports.CreateSummonerDto = CreateSummonerDto;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonersService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(19);
let SummonersService = class SummonersService {
    constructor(summonerModel) {
        this.summonerModel = summonerModel;
    }
    async create(createSummonerDto) {
        const createdSummoner = new this.summonerModel(createSummonerDto);
        return createdSummoner.save();
    }
    async findOne(name) {
        return this.summonerModel.findOne({ name });
    }
    async findAll() {
        return this.summonerModel.find().exec();
    }
};
SummonersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SUMMONER_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], SummonersService);
exports.SummonersService = SummonersService;


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summonersProviders = void 0;
const summoner_schema_1 = __webpack_require__(21);
exports.summonersProviders = [
    {
        provide: 'SUMMONER_MODEL',
        useFactory: (mongoose) => mongoose.model('Summoner', summoner_schema_1.SummonerSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonerSchema = void 0;
const mongoose = __webpack_require__(19);
exports.SummonerSchema = new mongoose.Schema({
    id: String,
    accountId: String,
    puuid: String,
    name: String,
    profileIconId: Number,
    revisionDate: Number,
    summonerLevel: Number,
});


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(3);
const database_providers_1 = __webpack_require__(23);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        providers: [...database_providers_1.databaseProviders],
        exports: [...database_providers_1.databaseProviders],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.databaseProviders = void 0;
const mongoose = __webpack_require__(19);
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await mongoose.connect('mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures'),
    },
];


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointsModule = void 0;
const common_1 = __webpack_require__(3);
const points_controller_1 = __webpack_require__(25);
const points_provider_1 = __webpack_require__(28);
const points_service_1 = __webpack_require__(27);
const database_module_1 = __webpack_require__(22);
let PointsModule = class PointsModule {
};
PointsModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [points_controller_1.PointsController],
        providers: [points_service_1.PointsService, ...points_provider_1.pointsProviders]
    })
], PointsModule);
exports.PointsModule = PointsModule;


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointsController = void 0;
const common_1 = __webpack_require__(3);
const create_point_dto_1 = __webpack_require__(26);
const points_service_1 = __webpack_require__(27);
const moment = __webpack_require__(7);
let PointsController = class PointsController {
    constructor(pointsService) {
        this.pointsService = pointsService;
    }
    async create(createPointDto) {
        makeFakerPointStub().map(createPointDto => this.pointsService.create(createPointDto));
    }
    async rawDatabyName(summonerName) {
        return this.pointsService.findAllbyName(summonerName);
    }
    async chartDatabyName(summonerName) {
        const Points = this.pointsService.findAllbyName(summonerName);
        const results = (await Points).map(point => this.pointsService.PointtoLine(point));
        return results;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_point_dto_1.CreatePointDto !== "undefined" && create_point_dto_1.CreatePointDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], PointsController.prototype, "create", null);
__decorate([
    common_1.Get(':summonerName'),
    __param(0, common_1.Param('summonerName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PointsController.prototype, "rawDatabyName", null);
__decorate([
    common_1.Get(':summonerName/chart'),
    __param(0, common_1.Param('summonerName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PointsController.prototype, "chartDatabyName", null);
PointsController = __decorate([
    common_1.Controller('points'),
    __metadata("design:paramtypes", [typeof (_d = typeof points_service_1.PointsService !== "undefined" && points_service_1.PointsService) === "function" ? _d : Object])
], PointsController);
exports.PointsController = PointsController;
function makeFakerPointStub() {
    console.log("CREATE");
    let createPointDtoTemp;
    const results = [];
    const lps = [284, 247, 226, 154, 154, 154, 154, 136, 153, 188, 169];
    for (const index in new Array(11).fill(1)) {
        const time = (moment().subtract(index, 'days').valueOf());
        createPointDtoTemp = {
            "leagueId": "58d53e1d-0514-3760-a988-50bf33fb782f",
            "queueType": "RANKED_SOLO_5x5",
            "tier": "MASTER",
            "rank": "I",
            "summonerId": "D0QIxicbLmrkll0Xkgd8aHH2LZOWFJzKC5hUf57UMQLLaw",
            "summonerName": "Hide on bush",
            "leaguePoints": lps[index],
            "wins": 606,
            "losses": 599,
            "veteran": false,
            "inactive": false,
            "freshBlood": false,
            "hotStreak": true,
            "time": time,
        };
        results.push(createPointDtoTemp);
    }
    return results;
}


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePointDto = void 0;
class CreatePointDto {
}
exports.CreatePointDto = CreatePointDto;


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointsService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(19);
const moment = __webpack_require__(7);
let PointsService = class PointsService {
    constructor(pointModel) {
        this.pointModel = pointModel;
    }
    async create(createPointDto) {
        const createdPoint = new this.pointModel(createPointDto);
        return createdPoint.save();
    }
    async findAllbyName(summonerName) {
        const points = this.pointModel.find({ summonerName }).sort('time').exec();
        return points;
    }
    PointtoLine(point) {
        const line = { time: moment(Number(point.time)).format('YYYY-MM-DD'), value: point.leaguePoints };
        console.log(line);
        return line;
    }
};
PointsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SUMMONER_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], PointsService);
exports.PointsService = PointsService;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pointsProviders = void 0;
const point_schema_1 = __webpack_require__(29);
exports.pointsProviders = [
    {
        provide: 'SUMMONER_MODEL',
        useFactory: (mongoose) => mongoose.model('Point', point_schema_1.PointSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointSchema = void 0;
const mongoose = __webpack_require__(19);
exports.PointSchema = new mongoose.Schema({
    leagueId: String,
    queueType: String,
    tier: String,
    rank: String,
    summonerId: String,
    summonerName: String,
    leaguePoints: Number,
    wins: Number,
    losses: Number,
    veteran: Boolean,
    inactive: Boolean,
    freshBlood: Boolean,
    hotStreak: Boolean,
    time: Number,
});


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(3);
const orders_service_1 = __webpack_require__(31);
const orders_provider_1 = __webpack_require__(32);
const orders_controller_1 = __webpack_require__(34);
const database_module_1 = __webpack_require__(22);
const bull_1 = __webpack_require__(38);
const orders_processor_1 = __webpack_require__(39);
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    common_1.Module({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'orders',
            }),
            database_module_1.DatabaseModule
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, orders_processor_1.OrdersProcessor, ...orders_provider_1.ordersProviders]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrdersService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(19);
const common_2 = __webpack_require__(3);
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(orderModel) {
        this.orderModel = orderModel;
        this.logger = new common_2.Logger(OrdersService_1.name);
    }
    async create(createOrderDto) {
        const createdOrder = new this.orderModel(createOrderDto);
        const order = await createdOrder.save();
        return order;
    }
    async find(_id) {
        const order = await this.orderModel.findOne({ _id }).exec();
        return order;
    }
    async findAll() {
        const order = await this.orderModel.find().exec();
        return order;
    }
    async update(_id, updateOrderDto) {
        const result = await this.orderModel.updateOne({ _id }, updateOrderDto).exec();
        this.logger.debug("update");
    }
    deleteAll() {
        this.orderModel.deleteMany({ status: "GO" });
        this.orderModel.deleteMany({ status: "CM" });
    }
};
OrdersService = OrdersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ORDER_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], OrdersService);
exports.OrdersService = OrdersService;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ordersProviders = void 0;
const order_schema_1 = __webpack_require__(33);
exports.ordersProviders = [
    {
        provide: 'ORDER_MODEL',
        useFactory: (mongoose) => mongoose.model('Order', order_schema_1.OrderSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSchema = void 0;
const mongoose = __webpack_require__(19);
exports.OrderSchema = new mongoose.Schema({
    id: String,
    memberId: String,
    marketId: String,
    price: Number,
    amount: Number,
    type: String,
    status: String,
    time: Number,
});


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrdersController_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(3);
const orders_service_1 = __webpack_require__(31);
const create_order_dto_1 = __webpack_require__(35);
const update_order_dto_1 = __webpack_require__(36);
const common_2 = __webpack_require__(3);
let OrdersController = OrdersController_1 = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
        this.logger = new common_2.Logger(OrdersController_1.name);
    }
    async create(createOrderDto) {
        this.logger.debug("create");
        const order = await this.ordersService.create(createOrderDto);
        return order;
    }
    async cancelOrder(id) {
        const order = await this.ordersService.find(id);
        return 200;
    }
    update(id, updateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }
    deleteAll() {
        this.logger.debug("deleteAll");
        this.ordersService.deleteAll();
        return 200;
    }
    findAll() {
        return this.ordersService.findAll();
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_order_dto_1.CreateOrderDto !== "undefined" && create_order_dto_1.CreateOrderDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    common_1.Delete(''),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrder", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_order_dto_1.UpdateOrderDto !== "undefined" && update_order_dto_1.UpdateOrderDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "update", null);
__decorate([
    common_1.Delete('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "deleteAll", null);
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
OrdersController = OrdersController_1 = __decorate([
    common_1.Controller('orders'),
    __metadata("design:paramtypes", [typeof (_c = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _c : Object])
], OrdersController);
exports.OrdersController = OrdersController;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrderDto = void 0;
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateOrderDto = void 0;
const mapped_types_1 = __webpack_require__(37);
const create_order_dto_1 = __webpack_require__(35);
class UpdateOrderDto extends mapped_types_1.PartialType(create_order_dto_1.CreateOrderDto) {
}
exports.UpdateOrderDto = UpdateOrderDto;


/***/ }),
/* 37 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");;

/***/ }),
/* 38 */
/***/ ((module) => {

module.exports = require("@nestjs/bull");;

/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrdersProcessor_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersProcessor = void 0;
const bull_1 = __webpack_require__(38);
const common_1 = __webpack_require__(3);
const bull_2 = __webpack_require__(40);
const trader_1 = __webpack_require__(41);
const orders_service_1 = __webpack_require__(31);
let OrdersProcessor = OrdersProcessor_1 = class OrdersProcessor {
    constructor(ordersService) {
        this.ordersService = ordersService;
        this.logger = new common_1.Logger(OrdersProcessor_1.name);
    }
    orderAdd(job) {
        trader_1.default.addOrder(job.data);
    }
    orderComplete(job) {
        const order = job.data;
    }
    orderCancel(job) {
        const order = job.data;
    }
};
__decorate([
    bull_1.Process('orderAdd'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_2.Job !== "undefined" && bull_2.Job) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], OrdersProcessor.prototype, "orderAdd", null);
__decorate([
    bull_1.Process('orderComplete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof bull_2.Job !== "undefined" && bull_2.Job) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], OrdersProcessor.prototype, "orderComplete", null);
__decorate([
    bull_1.Process('orderCancel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof bull_2.Job !== "undefined" && bull_2.Job) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], OrdersProcessor.prototype, "orderCancel", null);
OrdersProcessor = OrdersProcessor_1 = __decorate([
    bull_1.Processor('orders'),
    __metadata("design:paramtypes", [typeof (_d = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _d : Object])
], OrdersProcessor);
exports.OrdersProcessor = OrdersProcessor;


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("bull");;

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(3);
const Bull = __webpack_require__(40);
class Trader {
    constructor(MKNAME) {
        this.ordersQueue = new Bull('orders', 'redis://127.0.0.1:6379');
        this.logger = new common_1.Logger(Trader.name);
        this.MKNAME = "TEST";
        this.SellOrderBook = [];
        this.BuyOrderBook = [];
        this.MKNAME = MKNAME;
        this.initializeOrderBook();
        this.logger.debug(MKNAME + "Trade init");
    }
    initializeOrderBook() {
    }
    getBuyOrderBook() {
        return this.BuyOrderBook;
    }
    getSellOrderBook() {
        return this.SellOrderBook;
    }
    getOrderBooks() {
        return {
            S: this.getSellOrderBook().map(orders => orders.map(order => {
                return { price: order.price, amount: order.amount };
            })),
            B: this.getBuyOrderBook().map(orders => orders.map(order => {
                return { price: order.price, amount: order.amount };
            })),
        };
    }
    showOrderBooks() {
        const showOrderBook = (ob) => {
            return ob.map(orders => {
                if (orders.length !== 0) {
                    const t_amount = orders.map(order => Number(order.amount)).reduce((p, c) => p + c, 0);
                    const price = orders[0].price;
                    return { t_amount, price };
                }
            });
        };
        this.logger.debug("==========================================");
        this.logger.debug({
            S: showOrderBook(this.getSellOrderBook()),
            B: showOrderBook(this.getBuyOrderBook())
        });
        return {
            S: showOrderBook(this.getSellOrderBook()),
            B: showOrderBook(this.getBuyOrderBook())
        };
    }
    addOrder(order) {
        this.doTrade(order);
    }
    _addOrder(order) {
        const mergeOrderBook = order.type === "S" ? this.getSellOrderBook() : this.getBuyOrderBook();
        const thisOrder = order;
        const flattened = targetOrderBook => [].concat(...targetOrderBook);
        if (flattened(mergeOrderBook).length === 0) {
            mergeOrderBook.push([order]);
            return;
        }
        for (let center = mergeOrderBook.length - 1; center >= 0; center--) {
            const mergeOrders = mergeOrderBook[center];
            if (mergeOrders.length === 0) {
                mergeOrderBook.splice(center, 1);
                continue;
            }
            ;
            const mergeOrder = mergeOrders[0];
            if (mergeOrder.price === thisOrder.price) {
                mergeOrders.unshift(thisOrder);
                return;
            }
            else if (thisOrder.type === "S") {
                if (mergeOrder.price > thisOrder.price) {
                    mergeOrderBook.splice(center + 1, 0, [thisOrder]);
                    return;
                }
                else if (mergeOrder.price < thisOrder.price) {
                    if (center === 0)
                        mergeOrderBook.unshift([thisOrder]);
                    continue;
                }
            }
            else if (thisOrder.type === "B") {
                if (mergeOrder.price < thisOrder.price) {
                    mergeOrderBook.splice(center + 1, 0, [thisOrder]);
                    return;
                }
                else if (mergeOrder.price > thisOrder.price) {
                    if (center === 0)
                        mergeOrderBook.unshift([thisOrder]);
                    continue;
                }
            }
            else {
                throw new Error("Wrong order Type");
            }
        }
    }
    doTrade(order) {
        const makerOrderBook = order.type === "S" ? this.getBuyOrderBook() : this.getSellOrderBook();
        const flattened = targetOrderBook => [].concat(...targetOrderBook);
        if (flattened(makerOrderBook).length === 0) {
            this.logger.debug("오더북 비어있음 => 추가");
            this._addOrder(order);
            return;
        }
        const takerOrder = order;
        for (let center = makerOrderBook.length - 1; center >= 0; center--) {
            const makerOrders = makerOrderBook[center];
            if (makerOrders.length === 0) {
                makerOrderBook.splice(center, 1);
                continue;
            }
            ;
            for (let index = makerOrders.length - 1; index >= 0; index--) {
                const makerOrder = makerOrders[index];
                let buyer = order.type === "S" ? makerOrder : order;
                let seller = order.type === "S" ? order : makerOrder;
                if (buyer.price >= seller.price) {
                    this.logger.debug("가격 충족 => 체결");
                    if (buyer.amount < seller.amount) {
                        this.logger.debug("buyer 수량 전체 충족 seller 수량 일부 충족");
                        makerOrder.type === "B" ? makerOrders.splice(index, 1) : null;
                        buyer.status = "CM";
                        this.filledOrder(buyer);
                        seller.amount -= buyer.amount;
                        this.filledOrder(seller);
                        return;
                    }
                    else if (buyer.amount === seller.amount) {
                        this.logger.debug("buyer 수량 전체 충족 seller 수량 전체 충족");
                        makerOrders.splice(index, 1);
                        buyer.status = "CM";
                        seller.status = "CM";
                        this.filledOrder(buyer);
                        this.filledOrder(seller);
                        return;
                    }
                    else if (buyer.amount > seller.amount) {
                        this.logger.debug("buyer 수량 일부 충족 seller 수량 전체 충족");
                        makerOrder.type === "S" ? makerOrders.splice(index, 1) : null;
                        seller.status = "CM";
                        this.filledOrder(seller);
                        buyer.amount -= seller.amount;
                        this.filledOrder(buyer);
                        this.doTrade(buyer);
                        return;
                    }
                    else {
                        throw new Error("가격 조건 오류");
                    }
                }
                else if (buyer.price < seller.price) {
                    this.logger.debug("가격 미충족 => 미체결");
                    this._addOrder(order);
                    return;
                }
            }
        }
    }
    filledOrder(order) {
        this.ordersQueue.add('orderComplete', order);
    }
    cancelOrder() {
    }
}
const trader = new Trader('NR');
exports.default = trader;


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessorModule = void 0;
const bull_1 = __webpack_require__(38);
const common_1 = __webpack_require__(3);
const processor_controller_1 = __webpack_require__(43);
let ProcessorModule = class ProcessorModule {
};
ProcessorModule = __decorate([
    common_1.Module({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'orders',
            }),
        ],
        controllers: [processor_controller_1.ProcessorController],
    })
], ProcessorModule);
exports.ProcessorModule = ProcessorModule;


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProcessorController_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProcessorController = void 0;
const bull_1 = __webpack_require__(38);
const common_1 = __webpack_require__(3);
const bull_2 = __webpack_require__(40);
const common_2 = __webpack_require__(3);
const trader_1 = __webpack_require__(41);
let ProcessorController = ProcessorController_1 = class ProcessorController {
    constructor(orderQueue) {
        this.orderQueue = orderQueue;
        this.logger = new common_2.Logger(ProcessorController_1.name);
    }
    async orderbook() {
        return trader_1.default.showOrderBooks();
    }
    async getorderbook() {
        this.logger.debug(trader_1.default.getOrderBooks());
        return trader_1.default.getOrderBooks();
    }
};
__decorate([
    common_1.Get('orderbook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProcessorController.prototype, "orderbook", null);
__decorate([
    common_1.Get('getorderbook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProcessorController.prototype, "getorderbook", null);
ProcessorController = ProcessorController_1 = __decorate([
    common_1.Controller('processor'),
    __param(0, bull_1.InjectQueue('orders')),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _a : Object])
], ProcessorController);
exports.ProcessorController = ProcessorController;


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-ws");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;