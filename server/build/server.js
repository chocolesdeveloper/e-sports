"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/games', (request, response) => {
    return ([]);
});
app.post('/ads', (request, response) => {
    return response.status(201).json([]);
});
app.get('/games/:id/ads', (request, response) => {
    // const gameId = request.params.id;
    return response.json([
        { id: 1, name: 'Anuncia 1' },
        { id: 2, name: 'Anuncia 2' },
        { id: 3, name: 'Anuncia 3' },
        { id: 4, name: 'Anuncia 4' },
    ]);
});
app.get('/ads/:id/discord', (request, response) => {
    // const adId = request.params.id;
    return response.json([]);
});
app.listen(3333);
