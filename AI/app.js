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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var node_crypto_1 = require("node:crypto");
var mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
var streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
var types_js_1 = require("@modelcontextprotocol/sdk/types.js");
var app = (0, express_1.default)();
app.use(express_1.default.json());
// 添加CORS头
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, mcp-session-id');
    res.header('Access-Control-Expose-Headers', 'mcp-session-id');
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});
// Map to store transports by session ID
var transports = {};
// Handle POST requests for client-to-server communication
app.post('/mcp', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionId, transport_1, server, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('POST /mcp - Headers:', req.headers);
                console.log('POST /mcp - Body:', JSON.stringify(req.body));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                sessionId = req.headers['mcp-session-id'];
                if (!(sessionId && transports[sessionId])) return [3 /*break*/, 2];
                // Reuse existing transport
                console.log("Reusing existing transport for session: ".concat(sessionId));
                transport_1 = transports[sessionId];
                return [3 /*break*/, 5];
            case 2:
                if (!(!sessionId && (0, types_js_1.isInitializeRequest)(req.body))) return [3 /*break*/, 4];
                // New initialization request
                console.log('Creating new transport for initialization request');
                transport_1 = new streamableHttp_js_1.StreamableHTTPServerTransport({
                    sessionIdGenerator: function () { return (0, node_crypto_1.randomUUID)(); },
                    onsessioninitialized: function (sessionId) {
                        // Store the transport by session ID
                        console.log("Session initialized with ID: ".concat(sessionId));
                        transports[sessionId] = transport_1;
                    }
                });
                // Clean up transport when closed
                transport_1.onclose = function () {
                    if (transport_1.sessionId) {
                        console.log("Closing transport for session: ".concat(transport_1.sessionId));
                        delete transports[transport_1.sessionId];
                    }
                };
                server = new mcp_js_1.McpServer({
                    name: "example-server",
                    version: "1.0.0"
                });
                // ... set up server resources, tools, and prompts ...
                // Connect to the MCP server
                return [4 /*yield*/, server.connect(transport_1)];
            case 3:
                // ... set up server resources, tools, and prompts ...
                // Connect to the MCP server
                _a.sent();
                console.log('Server connected to transport');
                return [3 /*break*/, 5];
            case 4:
                // Invalid request
                console.error('Invalid request: No valid session ID provided');
                res.status(400).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32000,
                        message: 'Bad Request: No valid session ID provided',
                    },
                    id: null,
                });
                return [2 /*return*/];
            case 5:
                // Handle the request
                console.log('Handling POST request');
                return [4 /*yield*/, transport_1.handleRequest(req, res, req.body)];
            case 6:
                _a.sent();
                console.log('POST request handled successfully');
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.error('Error handling POST request:', error_1);
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32000,
                        message: "Internal server error: ".concat(error_1.message || 'Unknown error'),
                    },
                    id: null,
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
// Reusable handler for GET and DELETE requests
var handleSessionRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionId, transport, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("".concat(req.method, " /mcp - Headers:"), req.headers);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                sessionId = req.headers['mcp-session-id'];
                if (!sessionId || !transports[sessionId]) {
                    console.error("Invalid or missing session ID: ".concat(sessionId));
                    res.status(400).send('Invalid or missing session ID');
                    return [2 /*return*/];
                }
                console.log("Handling ".concat(req.method, " request for session: ").concat(sessionId));
                transport = transports[sessionId];
                return [4 /*yield*/, transport.handleRequest(req, res)];
            case 2:
                _a.sent();
                console.log("".concat(req.method, " request handled successfully"));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Error handling ".concat(req.method, " request:"), error_2);
                if (!res.headersSent) {
                    res.status(500).send("Internal server error: ".concat(error_2.message || 'Unknown error'));
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Handle GET requests for server-to-client notifications via SSE
app.get('/mcp', handleSessionRequest);
// Handle DELETE requests for session termination
app.delete('/mcp', handleSessionRequest);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("MCP server started on port ".concat(PORT));
});
