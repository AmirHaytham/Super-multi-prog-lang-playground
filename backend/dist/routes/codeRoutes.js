"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const codeController_1 = require("../controllers/codeController");
const router = (0, express_1.Router)();
router.post('/execute', async (req, res) => {
    await (0, codeController_1.executeCode)(req, res);
});
exports.default = router;
