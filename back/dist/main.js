/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Futures')
        .setDescription('Futures API description :>')
        .setVersion('1.0')
        .addTag('summoners')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(5002);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");;

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");;

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(4);
const logger_1 = __webpack_require__(5);
const orders_module_1 = __webpack_require__(6);
const summoners_module_1 = __webpack_require__(17);
const bull_1 = __webpack_require__(7);
const auth_module_1 = __webpack_require__(23);
const users_module_1 = __webpack_require__(27);
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_1.LoggerMiddleware)
            .forRoutes('*');
    }
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
            orders_module_1.OrdersModule,
            summoners_module_1.SummonersModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");;

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerMiddleware = void 0;
const common_1 = __webpack_require__(4);
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        const { ip, method, baseUrl: url } = request;
        const userAgent = request.get('user-agent') || '';
        response.on('close', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            this.logger.verbose(`${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
        });
        next();
    }
};
LoggerMiddleware = __decorate([
    common_1.Injectable()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;


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
exports.OrdersModule = void 0;
const bull_1 = __webpack_require__(7);
const common_1 = __webpack_require__(4);
const database_module_1 = __webpack_require__(8);
const orders_controller_1 = __webpack_require__(11);
const orders_provider_1 = __webpack_require__(15);
const orders_service_1 = __webpack_require__(12);
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    common_1.Module({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'order',
            }),
            database_module_1.DatabaseModule
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, ...orders_provider_1.ordersProviders]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/bull");;

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(4);
const database_providers_1 = __webpack_require__(9);
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
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.databaseProviders = void 0;
const mongoose = __webpack_require__(10);
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await mongoose.connect('mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures'),
    },
];


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("mongoose");;

/***/ }),
/* 11 */
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
var OrdersController_1, _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(2);
const orders_service_1 = __webpack_require__(12);
const create_order_dto_1 = __webpack_require__(13);
const bull_1 = __webpack_require__(7);
const bull_2 = __webpack_require__(14);
let OrdersController = OrdersController_1 = class OrdersController {
    constructor(ordersService, orderQueue) {
        this.ordersService = ordersService;
        this.orderQueue = orderQueue;
        this.logger = new common_1.Logger(OrdersController_1.name);
    }
    async postOrder(createOrderDto) {
        createOrderDto.total_qty = createOrderDto.qty;
        const order = await this.ordersService.create(createOrderDto);
        this.logger.debug(createOrderDto.marketId.toString());
        this.orderQueue.add(createOrderDto.marketId.toString(), order, { attempts: 5, backoff: 1000 });
        return order;
    }
    async cancelOrder(cancelOrderDto) {
        this.orderQueue.add(cancelOrderDto.marketId.toString() + "Cancel", cancelOrderDto, { attempts: 5, backoff: 1000 });
        return 'success';
    }
    async getOrderAll() {
        const orders = await this.ordersService.readAll();
        return orders;
    }
    async getOrderOne(id) {
        const orders = await this.ordersService.readOne(id);
        return orders;
    }
    async deleteOrderAll(memberId) {
        return this.ordersService.deleteAll(memberId);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create Order' }),
    swagger_1.ApiResponse({ status: 201, description: 'Created' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_order_dto_1.CreateOrderDto !== "undefined" && create_order_dto_1.CreateOrderDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "postOrder", null);
__decorate([
    common_1.Delete(''),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrder", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], OrdersController.prototype, "getOrderAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], OrdersController.prototype, "getOrderOne", null);
__decorate([
    common_1.Delete('all/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deleteOrderAll", null);
OrdersController = OrdersController_1 = __decorate([
    common_1.Controller('orders'),
    __param(1, bull_1.InjectQueue('order')),
    __metadata("design:paramtypes", [typeof (_d = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _d : Object, typeof (_e = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _e : Object])
], OrdersController);
exports.OrdersController = OrdersController;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OrdersService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(orderModel) {
        this.orderModel = orderModel;
        this.logger = new common_1.Logger(OrdersService_1.name);
    }
    async create(createOrderDto) {
        const defaultOrderProperty = {
            total_qty: createOrderDto.qty,
            time: new Date().getTime(),
            status: "GO"
        };
        const createdOrder = new this.orderModel(createOrderDto);
        const order = await createdOrder.save();
        return order;
    }
    async readOne(id) {
        const order = await this.orderModel.find({ id }).exec();
        return order;
    }
    async readAll() {
        const order = await this.orderModel.find().exec();
        return order;
    }
    async cancelOne(_id) {
        const result = await this.orderModel.updateOne({ _id }, { status: 'CC' }).exec();
        return result;
    }
    async deleteAll(memberId) {
        const result = await this.orderModel.deleteMany({ memberId });
        return result;
    }
    async deleteOne(id) {
        const result = await this.orderModel.deleteMany({ id });
        return result;
    }
};
OrdersService = OrdersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ORDER_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], OrdersService);
exports.OrdersService = OrdersService;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrderDto = void 0;
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("bull");;

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ordersProviders = void 0;
const order_schema_1 = __webpack_require__(16);
exports.ordersProviders = [
    {
        provide: 'ORDER_MODEL',
        useFactory: (mongoose) => mongoose.model('Order', order_schema_1.OrderSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSchema = void 0;
const mongoose = __webpack_require__(10);
exports.OrderSchema = new mongoose.Schema({
    memberId: String,
    marketId: String,
    price: Number,
    qty: Number,
    total_qty: Number,
    type: String,
    status: String,
    time: Number,
});


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonersModule = void 0;
const common_1 = __webpack_require__(4);
const summoners_controller_1 = __webpack_require__(18);
const summoners_provider_1 = __webpack_require__(21);
const summoners_service_1 = __webpack_require__(20);
const database_module_1 = __webpack_require__(8);
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
var SummonersController_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonersController = void 0;
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(2);
const create_summoner_dto_1 = __webpack_require__(19);
const summoners_service_1 = __webpack_require__(20);
let SummonersController = SummonersController_1 = class SummonersController {
    constructor(summonersService) {
        this.summonersService = summonersService;
        this.logger = new common_1.Logger(SummonersController_1.name);
    }
    async postSummoner(createSummonerDto) {
        this.summonersService.create(createSummonerDto);
    }
    async getSummonerAll() {
        const summoners = await this.summonersService.readAll();
        return summoners;
    }
    async getSummonerOne(name) {
        return this.summonersService.readOne(name);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create Summoner' }),
    swagger_1.ApiResponse({ status: 200, description: 'The found record' }),
    swagger_1.ApiResponse({ status: 201, description: 'Created' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden.' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_summoner_dto_1.CreateSummonerDto !== "undefined" && create_summoner_dto_1.CreateSummonerDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], SummonersController.prototype, "postSummoner", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], SummonersController.prototype, "getSummonerAll", null);
__decorate([
    common_1.Get(':name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SummonersController.prototype, "getSummonerOne", null);
SummonersController = SummonersController_1 = __decorate([
    swagger_1.ApiTags('summoners'),
    common_1.Controller('summoners'),
    __metadata("design:paramtypes", [typeof (_d = typeof summoners_service_1.SummonersService !== "undefined" && summoners_service_1.SummonersService) === "function" ? _d : Object])
], SummonersController);
exports.SummonersController = SummonersController;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSummonerDto = void 0;
class CreateSummonerDto {
}
exports.CreateSummonerDto = CreateSummonerDto;


/***/ }),
/* 20 */
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
var SummonersService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonersService = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
let SummonersService = SummonersService_1 = class SummonersService {
    constructor(summonerModel) {
        this.summonerModel = summonerModel;
        this.logger = new common_1.Logger(SummonersService_1.name);
    }
    async create(createSummonerDto) {
        const createdSummoner = new this.summonerModel(createSummonerDto);
        const summoner = await createdSummoner.save();
        return summoner;
    }
    async readOne(name) {
        return this.summonerModel.findOne({ name });
    }
    async readAll() {
        return this.summonerModel.find({}).exec();
    }
};
SummonersService = SummonersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('SUMMONER_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], SummonersService);
exports.SummonersService = SummonersService;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summonersProviders = void 0;
const summoner_schema_1 = __webpack_require__(22);
exports.summonersProviders = [
    {
        provide: 'SUMMONER_MODEL',
        useFactory: (mongoose) => mongoose.model('Summoner', summoner_schema_1.SummonerSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonerSchema = void 0;
const mongoose = __webpack_require__(10);
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
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(24);
const users_module_1 = __webpack_require__(27);
const passport_1 = __webpack_require__(29);
const jwt_1 = __webpack_require__(26);
const constants_1 = __webpack_require__(30);
const auth_controller_1 = __webpack_require__(31);
const local_strategy_1 = __webpack_require__(35);
const jwt_strategy_1 = __webpack_require__(37);
const open_api_strategy_1 = __webpack_require__(39);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '36000s' },
            })
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, open_api_strategy_1.OpenApiStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 24 */
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
var AuthService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(4);
const users_service_1 = __webpack_require__(25);
const jwt_1 = __webpack_require__(26);
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(id, passwd) {
        const user = await this.usersService.readOne(id);
        if (user && user.passwd === passwd) {
            const { _id, id, name, passwd } = user;
            return { _id, id, name, };
        }
        return null;
    }
    async login(user) {
        const payload = {
            _id: user._id,
            id: user.id,
            name: user.name,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
AuthService = AuthService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


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
var UsersService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
let UsersService = UsersService_1 = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async readOne(id) {
        this.logger.debug("readOne");
        return this.userModel.findOne({ id }).exec();
    }
    async create(createUserDto) {
        const createdUser = new this.userModel(createUserDto);
        const user = await createdUser.save();
        return user;
    }
};
UsersService = UsersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_MODEL')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");;

/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(4);
const users_service_1 = __webpack_require__(25);
const users_controller_1 = __webpack_require__(28);
const database_module_1 = __webpack_require__(8);
const users_provider_1 = __webpack_require__(40);
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, ...users_provider_1.usersProviders],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 28 */
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
var UsersController_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(4);
const jwt_auth_guard_1 = __webpack_require__(32);
const users_service_1 = __webpack_require__(25);
let UsersController = UsersController_1 = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.logger = new common_1.Logger(UsersController_1.name);
    }
    getProfile(req) {
        return this.usersService.readOne(req.user.id);
    }
    async signUp(CreateUserDto) {
        return this.usersService.create(CreateUserDto);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('profile'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    common_1.Post(''),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
UsersController = UsersController_1 = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");;

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey',
};


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
var AuthController_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(24);
const local_auth_guard_1 = __webpack_require__(33);
const jwt_auth_guard_1 = __webpack_require__(32);
const open_api_auth_guard_1 = __webpack_require__(38);
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    getProfile(req) {
        this.logger.debug("getProfile");
        return req.user;
    }
    test(req) {
        return "success";
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('login'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('profile'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    common_1.UseGuards(open_api_auth_guard_1.OpenApiAuthGuard),
    common_1.Get('openapi'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "test", null);
AuthController = AuthController_1 = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(4);
const passport_1 = __webpack_require__(29);
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException();
        }
        return user;
    }
};
JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    common_1.Injectable()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 33 */
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
var LocalAuthGuard_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const passport_1 = __webpack_require__(29);
const common_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(24);
let LocalAuthGuard = LocalAuthGuard_1 = class LocalAuthGuard extends passport_1.AuthGuard('local') {
    constructor(authSerivce) {
        super();
        this.authSerivce = authSerivce;
        this.logger = new common_1.Logger(LocalAuthGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = await this.authSerivce.validateUser('jslee', '1234');
        if (user) {
            request.user = {
                _id: user.id,
                id: user.id,
                name: user.name,
            };
            return true;
        }
        return false;
    }
};
LocalAuthGuard = LocalAuthGuard_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("passport-local");;

/***/ }),
/* 35 */
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
var LocalStrategy_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const passport_local_1 = __webpack_require__(34);
const passport_1 = __webpack_require__(29);
const common_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(24);
let LocalStrategy = LocalStrategy_1 = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
        this.logger = new common_1.Logger(LocalStrategy_1.name);
    }
    async validate(id, passwd) {
        const user = await this.authService.validateUser(id, passwd);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
LocalStrategy = LocalStrategy_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("passport-jwt");;

/***/ }),
/* 37 */
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(36);
const passport_1 = __webpack_require__(29);
const common_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(30);
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret,
        });
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async validate(payload) {
        const { iat, exp } = payload, user = __rest(payload, ["iat", "exp"]);
        return Object.assign({}, user);
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OpenApiAuthGuard_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpenApiAuthGuard = void 0;
const common_1 = __webpack_require__(4);
let OpenApiAuthGuard = OpenApiAuthGuard_1 = class OpenApiAuthGuard {
    constructor() {
        this.logger = new common_1.Logger(OpenApiAuthGuard_1.name);
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return true;
    }
};
OpenApiAuthGuard = OpenApiAuthGuard_1 = __decorate([
    common_1.Injectable()
], OpenApiAuthGuard);
exports.OpenApiAuthGuard = OpenApiAuthGuard;


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
var OpenApiStrategy_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpenApiStrategy = void 0;
const passport_local_1 = __webpack_require__(34);
const passport_1 = __webpack_require__(29);
const common_1 = __webpack_require__(4);
let OpenApiStrategy = OpenApiStrategy_1 = class OpenApiStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy, 'openapi') {
    constructor() {
        super({
            "test": "test"
        });
        this.logger = new common_1.Logger(OpenApiStrategy_1.name);
    }
    async validate(...args) {
        return true;
    }
};
OpenApiStrategy = OpenApiStrategy_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], OpenApiStrategy);
exports.OpenApiStrategy = OpenApiStrategy;


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.usersProviders = void 0;
const user_schema_1 = __webpack_require__(41);
exports.usersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (mongoose) => mongoose.model('User', user_schema_1.UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = void 0;
const mongoose = __webpack_require__(10);
exports.UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    passwd: String,
});


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