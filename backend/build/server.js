"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const console_1 = __importDefault(require("console"));
const uuid_1 = require("uuid");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
const router_1 = __importDefault(require("./router"));
const swagger_1 = __importDefault(require("./swagger"));
const cors_1 = __importDefault(require("cors"));
const api_info_1 = require("./api-info");
class Api {
    constructor() {
        this.server = (0, express_1.default)();
        this.publicPath = `${process.cwd()}/public`;
    }
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.middleware();
                yield this.router();
            }
            catch (err) {
                console.error(err);
            }
            return this;
        });
    }
    middleware() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.use((0, cors_1.default)({ credentials: true, origin: api_info_1.api.frontendUrl }));
            this.server.use(express_1.default.json());
            this.server.use((0, cookie_parser_1.default)());
            this.server.use((0, express_session_1.default)({
                genid: () => (0, uuid_1.v4)(),
                secret: "LJHsadk5$3sdLas",
                resave: true,
                saveUninitialized: true,
            }));
            this.server.use((0, morgan_1.default)("common"));
            this.server.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
        });
    }
    router() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.use(router_1.default);
            try {
                this.server.listen(api_info_1.api.defaultPort);
            }
            catch (err) {
                console.error(err);
                throw console_1.default;
            }
        });
    }
}
exports.Api = Api;
