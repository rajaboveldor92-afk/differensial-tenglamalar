# Laplace transform: solve y'' + 3y' + 2y = exp(-3t), y(0)=1, y'(0)=0
import sympy as sp
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

t, s = sp.symbols("t s", positive=True)
Y = sp.symbols("Y")

# Transform table checks
print("L{exp(-3t)} =", sp.laplace_transform(sp.exp(-3 * t), t, s, noconds=True))
print("L{sin(2t)}  =", sp.laplace_transform(sp.sin(2 * t), t, s, noconds=True))

# L{y''} = s^2 Y - s y(0) - y'(0),  L{y'} = s Y - y(0)
y0, yp0 = 1, 0
F = sp.laplace_transform(sp.exp(-3 * t), t, s, noconds=True)
eq = sp.Eq((s**2 * Y - s * y0 - yp0) + 3 * (s * Y - y0) + 2 * Y, F)
Ysol = sp.solve(eq, Y)[0]
print("Y(s) =", sp.factor(Ysol))
print("partial fractions:", sp.apart(Ysol, s))

y = sp.inverse_laplace_transform(Ysol, s, t)
y = sp.simplify(y.subs(sp.Heaviside(t), 1))
print("y(t) =", y)

# Check: substitute back into the ODE and the initial conditions
res = sp.simplify(y.diff(t, 2) + 3 * y.diff(t) + 2 * y - sp.exp(-3 * t))
print("residual =", res, " y(0) =", y.subs(t, 0), " y'(0) =", y.diff(t).subs(t, 0))

# Compare with dsolve
f = sp.Function("f")
ds = sp.dsolve(f(t).diff(t, 2) + 3 * f(t).diff(t) + 2 * f(t) - sp.exp(-3 * t), f(t),
               ics={f(0): 1, f(t).diff(t).subs(t, 0): 0})
print("dsolve agrees:", sp.simplify(ds.rhs - y) == 0)

g = sp.lambdify(t, y, "numpy")
tt = np.linspace(0, 6, 300)
plt.figure(figsize=(6, 4))
plt.plot(tt, g(tt), lw=2, label="$y(t)$")
plt.xlabel("$t$"); plt.ylabel("$y$"); plt.grid(alpha=0.3)
plt.title("$y''+3y'+2y=e^{-3t},\\ y(0)=1,\\ y'(0)=0$")
plt.legend()
plt.tight_layout()
plt.savefig("py10.png", dpi=100)
