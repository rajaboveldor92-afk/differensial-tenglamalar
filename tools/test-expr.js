// Checks of the answer checker (web/js/expr.js): equivalent forms accepted, wrong answers rejected, unparseable -> "cannot verify" (not "wrong").
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = { window: {}, Math, console }; ctx.window.DT = {}; ctx.DT = ctx.window.DT; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '../web/js/expr.js'), 'utf8'), ctx);
const E = ctx.DT.Expr; let fail = 0;
const t = (got, want, m) => { if (got !== want) { fail++; console.log('FAIL', m, '→', got); } else console.log('ok  ', m, '→', got); };
const eq = { ref: 'C*exp(2*x)', vars: { x: [-1, 1], C: [-2, 2] } };
t(E.checkEquiv('y = C*e^(2x)', eq).res, 'ok', 'C e^{2x} written as y = C*e^(2x)');
t(E.checkEquiv('C*exp(x)^2', eq).res, 'ok', 'C (e^x)^2 is the same function');
t(E.checkEquiv('C*exp(x)', eq).res, 'bad', 'C e^x is rejected');
t(E.checkEquiv('C*exp(2*x', eq).res, 'unk', 'unbalanced bracket -> cannot verify');
const ode = { residual: 'yp - 2*y', order: 1, consts: ['C'], x: [-1, 1], c: [-2, 2] };
t(E.checkOdeSolution('y = 5*C*exp(2*x)', ode).res, 'ok', "y'=2y: any constant multiple form accepted (5C e^{2x})");
t(E.checkOdeSolution('y = C*exp(-2*x)', ode).res, 'bad', "y'=2y: C e^{-2x} rejected");
t(E.checkNumeric('2,718', { value: Math.E, tol: 1e-3 }).res, 'ok', 'decimal comma accepted');
t(E.checkNumeric('e', { value: Math.E, tol: 1e-3 }).res, 'ok', 'symbolic e accepted for numeric answer');
t(E.checkNumeric('', { value: 1, tol: 1e-3 }).res, 'unk', 'empty -> not graded');
console.log(fail ? fail + ' failed' : 'all checker tests passed'); process.exit(fail ? 1 : 0);
