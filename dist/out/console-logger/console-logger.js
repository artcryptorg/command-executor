"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    constructor() { }
    ;
    static getInstance() {
        if (!ConsoleLogger.instance) {
            ConsoleLogger.instance = new ConsoleLogger();
        }
        return ConsoleLogger.instance;
    }
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.error(...args);
    }
    end() {
        console.log('готово');
    }
}
exports.ConsoleLogger = ConsoleLogger;
