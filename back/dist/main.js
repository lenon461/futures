/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({}));
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
const summoners_module_1 = __webpack_require__(18);
const assets_module_1 = __webpack_require__(27);
const bull_1 = __webpack_require__(7);
const auth_module_1 = __webpack_require__(32);
const members_module_1 = __webpack_require__(38);
const typeorm_1 = __webpack_require__(8);
const orders_entity_1 = __webpack_require__(12);
const members_entity_1 = __webpack_require__(36);
const assets_entity_1 = __webpack_require__(31);
const summoners_entity_1 = __webpack_require__(20);
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
                    port: 6379
                }
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: 'mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures',
                autoLoadEntities: true,
                entities: [orders_entity_1.Order, assets_entity_1.Asset, members_entity_1.Member, summoners_entity_1.Summoner],
                synchronize: true
            }),
            orders_module_1.OrdersModule,
            summoners_module_1.SummonersModule,
            auth_module_1.AuthModule,
            members_module_1.MembersModule,
            assets_module_1.AssetsModule,
        ]
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
const typeorm_1 = __webpack_require__(8);
const common_1 = __webpack_require__(4);
const orders_controller_1 = __webpack_require__(9);
const orders_service_1 = __webpack_require__(10);
const orders_repository_1 = __webpack_require__(11);
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    common_1.Module({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'order'
            }),
            typeorm_1.TypeOrmModule.forFeature([orders_repository_1.OrderRepository])
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, orders_repository_1.OrderRepositoryProvider]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/bull");;

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");;

/***/ }),
/* 9 */
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
var OrdersController_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(2);
const orders_service_1 = __webpack_require__(10);
const orders_entity_1 = __webpack_require__(12);
const bull_1 = __webpack_require__(7);
const bull_2 = __webpack_require__(15);
const jwt_auth_guard_1 = __webpack_require__(16);
let OrdersController = OrdersController_1 = class OrdersController {
    constructor(ordersService, orderQueue) {
        this.ordersService = ordersService;
        this.orderQueue = orderQueue;
        this.logger = new common_1.Logger(OrdersController_1.name);
    }
    async getOrders(request, status) {
        this.logger.debug(request.user.id);
        const orders = await this.ordersService.findAll({ MIDX: request.user.id });
        return orders;
    }
    async postOrder(request, orderIn) {
        const orderOut = await this.ordersService.save(orderIn);
        return orderOut;
    }
    async cancelOrder(cancelOrderDto) {
        this.orderQueue.add(cancelOrderDto.marketId.toString() + 'Cancel', cancelOrderDto, { attempts: 5, backoff: 1000 });
        return 'success';
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Get All Orders' }),
    __param(0, common_1.Request()), __param(1, common_1.Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], OrdersController.prototype, "getOrders", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create Order' }),
    swagger_1.ApiResponse({ status: 201, description: 'Created' }),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof orders_entity_1.CreateOrderDto !== "undefined" && orders_entity_1.CreateOrderDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "postOrder", null);
__decorate([
    common_1.Delete(''),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelOrder", null);
OrdersController = OrdersController_1 = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('orders'),
    __param(1, bull_1.InjectQueue('order')),
    __metadata("design:paramtypes", [typeof (_c = typeof orders_service_1.OrdersService !== "undefined" && orders_service_1.OrdersService) === "function" ? _c : Object, typeof (_d = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _d : Object])
], OrdersController);
exports.OrdersController = OrdersController;


/***/ }),
/* 10 */
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
const orders_repository_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(8);
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
        this.logger = new common_1.Logger(OrdersService_1.name);
    }
    async save(orderIn) {
        const order = await this.orderRepository.createOrder(orderIn);
        return order;
    }
    async findAll(params) {
        const order = await this.orderRepository.read(params);
        return order;
    }
};
OrdersService = OrdersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(orders_repository_1.OrderRepository)),
    __metadata("design:paramtypes", [typeof (_a = typeof orders_repository_1.OrderRepository !== "undefined" && orders_repository_1.OrderRepository) === "function" ? _a : Object])
], OrdersService);
exports.OrdersService = OrdersService;


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrderRepository_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderRepositoryProvider = exports.OrderRepository = void 0;
const common_1 = __webpack_require__(4);
const orders_entity_1 = __webpack_require__(12);
const typeorm_1 = __webpack_require__(13);
let OrderRepository = OrderRepository_1 = class OrderRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(OrderRepository_1.name);
    }
    async createOrder(orderIn) {
        const newOrder = Object.assign(Object.assign({}, orderIn), { OC_TQTY: orderIn.OC_QTY, OC_STATUS: 'GO' });
        return this.save(newOrder);
    }
    async read(cond) {
        return this.find(cond);
    }
    async updatOrder(order) {
        return this.save(order);
    }
    async delete(order) {
        return this.delete(order);
    }
};
OrderRepository = OrderRepository_1 = __decorate([
    typeorm_1.EntityRepository(orders_entity_1.Order)
], OrderRepository);
exports.OrderRepository = OrderRepository;
exports.OrderRepositoryProvider = {
    provide: 'OrderRepository',
    useFactory: (connection) => connection.getCustomRepository(OrderRepository),
    inject: [typeorm_1.Connection]
};


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
exports.CreateOrderDto = exports.Order = void 0;
const typeorm_1 = __webpack_require__(13);
const class_validator_1 = __webpack_require__(14);
let Order = class Order {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeof (_a = typeof typeorm_1.ObjectID !== "undefined" && typeorm_1.ObjectID) === "function" ? _a : Object)
], Order.prototype, "OCIDX", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "MKIDX", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "MIDX", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "OC_TYPE", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "OC_KIND", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Order.prototype, "OC_PRICE", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Order.prototype, "OC_QTY", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Order.prototype, "OC_TQTY", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Order.prototype, "OC_STATUS", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Order.prototype, "OC_CREATEDTIME", void 0);
Order = __decorate([
    typeorm_1.Entity()
], Order);
exports.Order = Order;
class CreateOrderDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "MKIDX", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "MIDX", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "OC_TYPE", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "OC_KIND", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "OC_PRICE", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "OC_QTY", void 0);
exports.CreateOrderDto = CreateOrderDto;


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("typeorm");;

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("class-validator");;

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("bull");;

/***/ }),
/* 16 */
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
const passport_1 = __webpack_require__(17);
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
/* 17 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");;

/***/ }),
/* 18 */
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
const typeorm_1 = __webpack_require__(8);
const summoners_controller_1 = __webpack_require__(19);
const summoners_service_1 = __webpack_require__(21);
const database_module_1 = __webpack_require__(24);
const summoners_repository_1 = __webpack_require__(22);
let SummonersModule = class SummonersModule {
};
SummonersModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule,
            typeorm_1.TypeOrmModule.forFeature([summoners_repository_1.SummonerRepository])],
        controllers: [summoners_controller_1.SummonersController],
        providers: [summoners_service_1.SummonersService, summoners_repository_1.SummonerRepositoryProvider],
        exports: [summoners_service_1.SummonersService]
    })
], SummonersModule);
exports.SummonersModule = SummonersModule;


/***/ }),
/* 19 */
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
var SummonersController_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonersController = void 0;
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(2);
const summoners_entity_1 = __webpack_require__(20);
const summoners_service_1 = __webpack_require__(21);
let SummonersController = SummonersController_1 = class SummonersController {
    constructor(summonersService) {
        this.summonersService = summonersService;
        this.logger = new common_1.Logger(SummonersController_1.name);
    }
    async postSummoner(summonerIn) {
        const summonerOut = await this.summonersService.save(summonerIn);
        return summonerOut;
    }
    async getSummoners() {
        const summoners = await this.summonersService.findAll({});
        return summoners;
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
    __metadata("design:paramtypes", [typeof (_a = typeof summoners_entity_1.CreateSummonerDto !== "undefined" && summoners_entity_1.CreateSummonerDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], SummonersController.prototype, "postSummoner", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], SummonersController.prototype, "getSummoners", null);
SummonersController = SummonersController_1 = __decorate([
    swagger_1.ApiTags('summoners'),
    common_1.Controller('summoners'),
    __metadata("design:paramtypes", [typeof (_c = typeof summoners_service_1.SummonersService !== "undefined" && summoners_service_1.SummonersService) === "function" ? _c : Object])
], SummonersController);
exports.SummonersController = SummonersController;


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSummonerDto = exports.Summoner = void 0;
const typeorm_1 = __webpack_require__(13);
const class_validator_1 = __webpack_require__(14);
let Summoner = class Summoner {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeof (_a = typeof typeorm_1.ObjectID !== "undefined" && typeorm_1.ObjectID) === "function" ? _a : Object)
], Summoner.prototype, "SIDX", void 0);
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], Summoner.prototype, "accountId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Summoner.prototype, "puuid", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Summoner.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Summoner.prototype, "profileIconId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Summoner.prototype, "revisionDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Summoner.prototype, "summonerLevel", void 0);
Summoner = __decorate([
    typeorm_1.Entity()
], Summoner);
exports.Summoner = Summoner;
class CreateSummonerDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSummonerDto.prototype, "accountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSummonerDto.prototype, "puuid", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSummonerDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateSummonerDto.prototype, "profileIconId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateSummonerDto.prototype, "revisionDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateSummonerDto.prototype, "summonerLevel", void 0);
exports.CreateSummonerDto = CreateSummonerDto;


/***/ }),
/* 21 */
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
const summoners_repository_1 = __webpack_require__(22);
const typeorm_1 = __webpack_require__(8);
let SummonersService = SummonersService_1 = class SummonersService {
    constructor(SummonerRepository) {
        this.SummonerRepository = SummonerRepository;
        this.logger = new common_1.Logger(SummonersService_1.name);
    }
    async save(summonrIn) {
        const summoner = await this.SummonerRepository.createSummoner(summonrIn);
        return summoner;
    }
    async findAll(params) {
        return this.SummonerRepository.read(params);
    }
    async getAllSIDXs() {
        const summoners = await this.SummonerRepository.read({});
        return summoners.map(ele => ele.SIDX);
    }
};
SummonersService = SummonersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(summoners_repository_1.SummonerRepository)),
    __metadata("design:paramtypes", [typeof (_a = typeof summoners_repository_1.SummonerRepository !== "undefined" && summoners_repository_1.SummonerRepository) === "function" ? _a : Object])
], SummonersService);
exports.SummonersService = SummonersService;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SummonerRepository_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SummonerRepositoryProvider = exports.SummonerRepository = void 0;
const common_1 = __webpack_require__(4);
const Summoners_entity_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(13);
let SummonerRepository = SummonerRepository_1 = class SummonerRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(SummonerRepository_1.name);
    }
    async createSummoner(SummonerIn) {
        const newSummoner = Object.assign({}, SummonerIn);
        return this.save(newSummoner);
    }
    async read(cond) {
        return this.find(cond);
    }
    async updatSummoner(Summoner) {
        return this.save(Summoner);
    }
    async delete(Summoner) {
        return this.delete(Summoner);
    }
};
SummonerRepository = SummonerRepository_1 = __decorate([
    typeorm_1.EntityRepository(Summoners_entity_1.Summoner)
], SummonerRepository);
exports.SummonerRepository = SummonerRepository;
exports.SummonerRepositoryProvider = {
    provide: 'SummonerRepository',
    useFactory: (connection) => connection.getCustomRepository(SummonerRepository),
    inject: [typeorm_1.Connection]
};


/***/ }),
/* 23 */
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSummonerDto = exports.Summoner = void 0;
const typeorm_1 = __webpack_require__(13);
const class_validator_1 = __webpack_require__(14);
let Summoner = class Summoner {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeof (_a = typeof typeorm_1.ObjectID !== "undefined" && typeorm_1.ObjectID) === "function" ? _a : Object)
], Summoner.prototype, "SIDX", void 0);
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], Summoner.prototype, "accountId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Summoner.prototype, "puuid", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Summoner.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Summoner.prototype, "profileIconId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Summoner.prototype, "revisionDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Summoner.prototype, "summonerLevel", void 0);
Summoner = __decorate([
    typeorm_1.Entity()
], Summoner);
exports.Summoner = Summoner;
class CreateSummonerDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSummonerDto.prototype, "accountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSummonerDto.prototype, "puuid", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSummonerDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateSummonerDto.prototype, "profileIconId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateSummonerDto.prototype, "revisionDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateSummonerDto.prototype, "summonerLevel", void 0);
exports.CreateSummonerDto = CreateSummonerDto;


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
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(4);
const database_providers_1 = __webpack_require__(25);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        providers: [...database_providers_1.databaseProviders],
        exports: [...database_providers_1.databaseProviders]
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.databaseProviders = void 0;
const mongoose = __webpack_require__(26);
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await mongoose.connect('mongodb+srv://seonjl:seonjl@cluster0.gbwnb.mongodb.net/futures')
    }
];


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("mongoose");;

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
exports.AssetsModule = void 0;
const bull_1 = __webpack_require__(7);
const typeorm_1 = __webpack_require__(8);
const common_1 = __webpack_require__(4);
const assets_controller_1 = __webpack_require__(28);
const assets_service_1 = __webpack_require__(29);
const assets_repository_1 = __webpack_require__(30);
const summoners_repository_1 = __webpack_require__(22);
const summoners_service_1 = __webpack_require__(21);
let AssetsModule = class AssetsModule {
};
AssetsModule = __decorate([
    common_1.Module({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'asset'
            }),
            typeorm_1.TypeOrmModule.forFeature([assets_repository_1.AssetRepository]),
        ],
        controllers: [assets_controller_1.AssetsController],
        providers: [assets_service_1.AssetsService, assets_repository_1.AssetRepositoryProvider, summoners_service_1.SummonersService, summoners_repository_1.SummonerRepositoryProvider]
    })
], AssetsModule);
exports.AssetsModule = AssetsModule;


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
var AssetsController_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetsController = void 0;
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(2);
const assets_service_1 = __webpack_require__(29);
const bull_1 = __webpack_require__(7);
const bull_2 = __webpack_require__(15);
const jwt_auth_guard_1 = __webpack_require__(16);
let AssetsController = AssetsController_1 = class AssetsController {
    constructor(assetsService, assetQueue) {
        this.assetsService = assetsService;
        this.assetQueue = assetQueue;
        this.logger = new common_1.Logger(AssetsController_1.name);
    }
    async getAssets(request, status) {
        const assets = await this.assetsService.findAll({ MIDX: request.user.id });
        return assets;
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Get All Assets' }),
    __param(0, common_1.Request()), __param(1, common_1.Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AssetsController.prototype, "getAssets", null);
AssetsController = AssetsController_1 = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('assets'),
    __param(1, bull_1.InjectQueue('asset')),
    __metadata("design:paramtypes", [typeof (_b = typeof assets_service_1.AssetsService !== "undefined" && assets_service_1.AssetsService) === "function" ? _b : Object, typeof (_c = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _c : Object])
], AssetsController);
exports.AssetsController = AssetsController;


/***/ }),
/* 29 */
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
var AssetsService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetsService = void 0;
const common_1 = __webpack_require__(4);
const assets_repository_1 = __webpack_require__(30);
const typeorm_1 = __webpack_require__(8);
const summoners_service_1 = __webpack_require__(21);
let AssetsService = AssetsService_1 = class AssetsService {
    constructor(assetRepository, summonersService) {
        this.assetRepository = assetRepository;
        this.summonersService = summonersService;
        this.logger = new common_1.Logger(AssetsService_1.name);
    }
    async addWallet(midx) {
        const SIDXs = await this.summonersService.getAllSIDXs();
        SIDXs.forEach((sidx) => {
            console.log(sidx);
            this.assetRepository.createAsset(midx, sidx);
        });
        return;
    }
    async findAll(params) {
        const asset = await this.assetRepository.read(params);
        return asset;
    }
};
AssetsService = AssetsService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(assets_repository_1.AssetRepository)),
    __metadata("design:paramtypes", [typeof (_a = typeof assets_repository_1.AssetRepository !== "undefined" && assets_repository_1.AssetRepository) === "function" ? _a : Object, typeof (_b = typeof summoners_service_1.SummonersService !== "undefined" && summoners_service_1.SummonersService) === "function" ? _b : Object])
], AssetsService);
exports.AssetsService = AssetsService;


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AssetRepository_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetRepositoryProvider = exports.AssetRepository = void 0;
const common_1 = __webpack_require__(4);
const assets_entity_1 = __webpack_require__(31);
const typeorm_1 = __webpack_require__(13);
let AssetRepository = AssetRepository_1 = class AssetRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(AssetRepository_1.name);
    }
    async createAsset(MIDX, SIDX) {
        const newAsset = { MIDX, SIDX, TOTAL_AMOUNT: 0, USING_AMOUNT: 0 };
        return this.save(newAsset);
    }
    async read(cond) {
        return this.find(cond);
    }
    async updatAsset(asset) {
        return this.save(asset);
    }
    async delete(asset) {
        return this.delete(asset);
    }
};
AssetRepository = AssetRepository_1 = __decorate([
    typeorm_1.EntityRepository(assets_entity_1.Asset)
], AssetRepository);
exports.AssetRepository = AssetRepository;
exports.AssetRepositoryProvider = {
    provide: 'AssetRepository',
    useFactory: (connection) => connection.getCustomRepository(AssetRepository),
    inject: [typeorm_1.Connection]
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAssetDto = exports.Asset = void 0;
const typeorm_1 = __webpack_require__(13);
const class_validator_1 = __webpack_require__(14);
let Asset = class Asset {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeof (_a = typeof typeorm_1.ObjectID !== "undefined" && typeorm_1.ObjectID) === "function" ? _a : Object)
], Asset.prototype, "MIDX", void 0);
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeof (_b = typeof typeorm_1.ObjectID !== "undefined" && typeorm_1.ObjectID) === "function" ? _b : Object)
], Asset.prototype, "SIDX", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Asset.prototype, "TOTAL_AMOUNT", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Asset.prototype, "USING_AMOUNT", void 0);
Asset = __decorate([
    typeorm_1.Entity()
], Asset);
exports.Asset = Asset;
class CreateAssetDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "MIDX", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAssetDto.prototype, "CIDX", void 0);
exports.CreateAssetDto = CreateAssetDto;


/***/ }),
/* 32 */
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
const auth_service_1 = __webpack_require__(33);
const members_module_1 = __webpack_require__(38);
const passport_1 = __webpack_require__(17);
const jwt_1 = __webpack_require__(37);
const constants_1 = __webpack_require__(40);
const auth_controller_1 = __webpack_require__(41);
const local_strategy_1 = __webpack_require__(44);
const jwt_strategy_1 = __webpack_require__(46);
const open_api_strategy_1 = __webpack_require__(48);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            members_module_1.MembersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '24000s' }
            })
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, open_api_strategy_1.OpenApiStrategy],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;


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
var AuthService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(4);
const members_service_1 = __webpack_require__(34);
const jwt_1 = __webpack_require__(37);
let AuthService = AuthService_1 = class AuthService {
    constructor(membersService, jwtService) {
        this.membersService = membersService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateMember(id, passwd) {
        this.logger.debug("validateMember");
        const member = await this.membersService.findMemberbyId(id);
        if (member && member.M_PASSWD === passwd) {
            const { MIDX, M_ID, M_NAME, M_PASSWD } = member;
            return { _id: MIDX, id: M_ID, name: M_NAME };
        }
        return null;
    }
    async login(user) {
        this.logger.debug("user");
        this.logger.debug(user);
        const payload = { _id: user._id, id: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
};
AuthService = AuthService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof members_service_1.MembersService !== "undefined" && members_service_1.MembersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


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
var MembersService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersService = void 0;
const common_1 = __webpack_require__(4);
const members_repository_1 = __webpack_require__(35);
const typeorm_1 = __webpack_require__(8);
let MembersService = MembersService_1 = class MembersService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
        this.logger = new common_1.Logger(MembersService_1.name);
    }
    async addNewMember(memberIn) {
        const member = await this.memberRepository.createMember(memberIn);
        return member;
    }
    async findAll(params) {
        const member = await this.memberRepository.read(params);
        return member;
    }
    async findMemberbyId(id) {
        this.logger.debug(id);
        const member = await this.memberRepository.readOne({ M_ID: id });
        this.logger.debug(member);
        return member;
    }
};
MembersService = MembersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(members_repository_1.MemberRepository)),
    __metadata("design:paramtypes", [typeof (_a = typeof members_repository_1.MemberRepository !== "undefined" && members_repository_1.MemberRepository) === "function" ? _a : Object])
], MembersService);
exports.MembersService = MembersService;


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MemberRepository_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemberRepositoryProvider = exports.MemberRepository = void 0;
const common_1 = __webpack_require__(4);
const members_entity_1 = __webpack_require__(36);
const typeorm_1 = __webpack_require__(13);
let MemberRepository = MemberRepository_1 = class MemberRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(MemberRepository_1.name);
    }
    async createMember(memberIn) {
        const newMember = { M_ID: memberIn.id, M_NAME: memberIn.name, M_PASSWD: memberIn.passwd, };
        return this.save(newMember);
    }
    async read(cond) {
        return this.find(cond);
    }
    async readOne(cond) {
        return this.findOne(cond);
    }
    async updatMember(Member) {
        return this.save(Member);
    }
    async delete(Member) {
        return this.delete(Member);
    }
};
MemberRepository = MemberRepository_1 = __decorate([
    typeorm_1.EntityRepository(members_entity_1.Member)
], MemberRepository);
exports.MemberRepository = MemberRepository;
exports.MemberRepositoryProvider = {
    provide: 'MemberRepository',
    useFactory: (connection) => connection.getCustomRepository(MemberRepository),
    inject: [typeorm_1.Connection]
};


/***/ }),
/* 36 */
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
exports.CreateMemberDto = exports.Member = void 0;
const typeorm_1 = __webpack_require__(13);
const class_validator_1 = __webpack_require__(14);
let Member = class Member {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeof (_a = typeof typeorm_1.ObjectID !== "undefined" && typeorm_1.ObjectID) === "function" ? _a : Object)
], Member.prototype, "MIDX", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Member.prototype, "M_ID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Member.prototype, "M_NAME", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Member.prototype, "M_PASSWD", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Member.prototype, "M_CREATEDTIME", void 0);
Member = __decorate([
    typeorm_1.Entity()
], Member);
exports.Member = Member;
class CreateMemberDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "passwd", void 0);
exports.CreateMemberDto = CreateMemberDto;


/***/ }),
/* 37 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");;

/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(8);
const members_service_1 = __webpack_require__(34);
const members_controller_1 = __webpack_require__(39);
const database_module_1 = __webpack_require__(24);
const members_repository_1 = __webpack_require__(35);
const assets_service_1 = __webpack_require__(29);
const assets_repository_1 = __webpack_require__(30);
const summoners_service_1 = __webpack_require__(21);
const summoners_repository_1 = __webpack_require__(22);
let MembersModule = class MembersModule {
};
MembersModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule,
            typeorm_1.TypeOrmModule.forFeature([members_repository_1.MemberRepository])
        ],
        controllers: [members_controller_1.MembersController],
        providers: [members_service_1.MembersService, members_repository_1.MemberRepositoryProvider,
            assets_service_1.AssetsService, assets_repository_1.AssetRepositoryProvider,
            summoners_service_1.SummonersService, summoners_repository_1.SummonerRepositoryProvider
        ],
        exports: [members_service_1.MembersService]
    })
], MembersModule);
exports.MembersModule = MembersModule;


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MembersController_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersController = void 0;
const common_1 = __webpack_require__(4);
const jwt_auth_guard_1 = __webpack_require__(16);
const members_service_1 = __webpack_require__(34);
const members_entity_1 = __webpack_require__(36);
const assets_service_1 = __webpack_require__(29);
let MembersController = MembersController_1 = class MembersController {
    constructor(membersService, assetsService) {
        this.membersService = membersService;
        this.assetsService = assetsService;
        this.logger = new common_1.Logger(MembersController_1.name);
    }
    async getProfile(req) {
        this.logger.debug(req.user.id);
        return await this.membersService.findMemberbyId(req.user.id);
    }
    async postMember(mermberIn) {
        const member = await this.membersService.addNewMember(mermberIn);
        const asset = await this.assetsService.addWallet(member.MIDX);
        return member;
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('profile'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getProfile", null);
__decorate([
    common_1.Post(''),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof members_entity_1.CreateMemberDto !== "undefined" && members_entity_1.CreateMemberDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "postMember", null);
MembersController = MembersController_1 = __decorate([
    common_1.Controller('members'),
    __metadata("design:paramtypes", [typeof (_b = typeof members_service_1.MembersService !== "undefined" && members_service_1.MembersService) === "function" ? _b : Object, typeof (_c = typeof assets_service_1.AssetsService !== "undefined" && assets_service_1.AssetsService) === "function" ? _c : Object])
], MembersController);
exports.MembersController = MembersController;


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey'
};


/***/ }),
/* 41 */
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
const auth_service_1 = __webpack_require__(33);
const local_auth_guard_1 = __webpack_require__(42);
const jwt_auth_guard_1 = __webpack_require__(16);
const open_api_auth_guard_1 = __webpack_require__(43);
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(req) {
        this.logger.debug('📢 req');
        console.log((req.user));
        return this.authService.login(req.user);
    }
    getProfile(req) {
        this.logger.debug('getProfile');
        return req.user;
    }
    test(req) {
        return 'success';
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
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const passport_1 = __webpack_require__(17);
const common_1 = __webpack_require__(4);
let LocalAuthGuard = class LocalAuthGuard extends passport_1.AuthGuard('local') {
};
LocalAuthGuard = __decorate([
    common_1.Injectable()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),
/* 43 */
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
        this.logger.debug('canActivate');
        this.logger.debug(request.headers);
        return true;
    }
};
OpenApiAuthGuard = OpenApiAuthGuard_1 = __decorate([
    common_1.Injectable()
], OpenApiAuthGuard);
exports.OpenApiAuthGuard = OpenApiAuthGuard;


/***/ }),
/* 44 */
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
const passport_local_1 = __webpack_require__(45);
const passport_1 = __webpack_require__(17);
const common_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(33);
let LocalStrategy = LocalStrategy_1 = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'id',
            passwordField: 'passwd'
        });
        this.authService = authService;
        this.logger = new common_1.Logger(LocalStrategy_1.name);
    }
    async validate(id, passwd, done) {
        this.logger.debug('📢 LocalStartegyss2');
        this.logger.debug(id + passwd);
        const member = await this.authService.validateMember(id, passwd);
        if (!member) {
            throw new common_1.UnauthorizedException();
        }
        return member;
    }
};
LocalStrategy = LocalStrategy_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("passport-local");;

/***/ }),
/* 46 */
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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(47);
const passport_1 = __webpack_require__(17);
const common_1 = __webpack_require__(4);
const constants_1 = __webpack_require__(40);
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret
        });
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async validate(payload) {
        return Object.assign({}, payload);
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 47 */
/***/ ((module) => {

module.exports = require("passport-jwt");;

/***/ }),
/* 48 */
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
const passport_local_1 = __webpack_require__(45);
const passport_1 = __webpack_require__(17);
const common_1 = __webpack_require__(4);
let OpenApiStrategy = OpenApiStrategy_1 = class OpenApiStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy, 'openapi') {
    constructor() {
        super({
            test: 'test'
        });
        this.logger = new common_1.Logger(OpenApiStrategy_1.name);
    }
    async validate(...args) {
        this.logger.debug('OpenApiStrategy validate');
        this.logger.debug(args);
        return true;
    }
};
OpenApiStrategy = OpenApiStrategy_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], OpenApiStrategy);
exports.OpenApiStrategy = OpenApiStrategy;


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