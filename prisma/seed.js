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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var client_1 = require("../lib/generated/prisma/client");
var prisma = new client_1.PrismaClient({
    accelerateUrl: process.env.DATABASE_URL, // ⚡ Prisma Accelerate
    log: ['query', 'info', 'warn', 'error'],
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var admin, fiction, classics, fantasy, philosophy, books, _i, books_1, book;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: 'admin@gilgames.com',
                            password: '123456', // em produção, use hash
                            role: 'ADMIN',
                        },
                    })
                    // ------------------- CATEGORIAS -------------------
                ];
                case 1:
                    admin = _a.sent();
                    return [4 /*yield*/, prisma.category.create({ data: { name: 'Fiction' } })];
                case 2:
                    fiction = _a.sent();
                    return [4 /*yield*/, prisma.category.create({ data: { name: 'Classics' } })];
                case 3:
                    classics = _a.sent();
                    return [4 /*yield*/, prisma.category.create({ data: { name: 'Fantasy' } })];
                case 4:
                    fantasy = _a.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: { name: 'Philosophy' },
                        })
                        // ------------------- LIVROS -------------------
                    ];
                case 5:
                    philosophy = _a.sent();
                    books = [
                        {
                            title: 'O Senhor dos Anéis',
                            author: 'J.R.R. Tolkien',
                            price: 29.99,
                            weight: 1200,
                            description: 'Uma saga épica de fantasia.',
                            categories: { connect: [{ id: fantasy.id }] },
                        },
                        {
                            title: '1984',
                            author: 'George Orwell',
                            price: 19.99,
                            weight: 800,
                            categories: { connect: [{ id: classics.id }] },
                        },
                        {
                            title: 'O Pequeno Príncipe',
                            author: 'Antoine de Saint-Exupéry',
                            price: 14.99,
                            weight: 500,
                            categories: { connect: [{ id: fiction.id }] },
                        },
                        {
                            title: 'Meditations',
                            author: 'Marcus Aurelius',
                            price: 12.5,
                            weight: 400,
                            categories: { connect: [{ id: philosophy.id }] },
                        },
                        {
                            title: 'Brave New World',
                            author: 'Aldous Huxley',
                            price: 18.99,
                            weight: 750,
                            categories: { connect: [{ id: classics.id }] },
                        },
                        {
                            title: 'Harry Potter e a Pedra Filosofal',
                            author: 'J.K. Rowling',
                            price: 24.99,
                            weight: 1000,
                            categories: { connect: [{ id: fantasy.id }] },
                        },
                        {
                            title: 'Crime e Castigo',
                            author: 'Fiódor Dostoiévski',
                            price: 22.5,
                            weight: 900,
                            categories: { connect: [{ id: classics.id }] },
                        },
                        {
                            title: 'O Mundo de Sofia',
                            author: 'Jostein Gaarder',
                            price: 21.0,
                            weight: 650,
                            categories: { connect: [{ id: philosophy.id }] },
                        },
                        {
                            title: 'Alice no País das Maravilhas',
                            author: 'Lewis Carroll',
                            price: 16.0,
                            weight: 500,
                            categories: { connect: [{ id: fiction.id }] },
                        },
                        {
                            title: 'O Hobbit',
                            author: 'J.R.R. Tolkien',
                            price: 27.0,
                            weight: 1100,
                            categories: { connect: [{ id: fantasy.id }] },
                        },
                    ];
                    _i = 0, books_1 = books;
                    _a.label = 6;
                case 6:
                    if (!(_i < books_1.length)) return [3 /*break*/, 9];
                    book = books_1[_i];
                    return [4 /*yield*/, prisma.book.create({ data: book })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log('Seed concluído! ✅');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
