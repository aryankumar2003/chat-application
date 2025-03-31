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
exports.login = exports.register = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, phone, password, profilephoto } = req.body;
        if (!username) {
            res.status(400).json({ error: "Please Enter Your Name" });
            return;
        }
        if (!phone) {
            res.status(400).json({ error: "Please Enter Your phone Number" });
            return;
        }
        if (!password) {
            res.status(400).json({ error: "Please Enter Your Password" });
            return;
        }
        if (yield usersModel_1.default.findOne({ phone })) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        // Hash Password Before Saving
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create New User
        yield usersModel_1.default.create({ username, phone, password: hashedPassword, profilephoto });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.register = register;
//login//login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, password } = req.body;
        if (!phone) {
            res.status(400).json({ error: "Please Enter Your phone Number" });
            return;
        }
        if (!password) {
            res.status(400).json({ error: "Please Enter Your Password" });
            return;
        }
        const user = yield usersModel_1.default.findOne({ phone });
        if (!user || !user.password) { // 🔹 Ensure password exists
            res.status(400).json({ error: "User Not Found or Invalid Credentials" });
            return;
        }
        // 🔹 Ensure `user.password` is always a string before comparison
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login Successfully", token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.login = login;
