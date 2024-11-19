"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const codeRoutes_1 = __importDefault(require("./routes/codeRoutes"));
const app = (0, express_1.default)();
// Configure CORS to allow all origins in development
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express_1.default.json());
app.use('/api', codeRoutes_1.default);
// Add a health check endpoint
app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
});
exports.default = app;
