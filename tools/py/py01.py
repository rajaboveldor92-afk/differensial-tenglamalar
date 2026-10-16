# Symbolic solution of first-order ODEs with sympy
import sympy as sp
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

x = sp.symbols("x")
y = sp.Function("y")

# 1) Separable equation: y' = x*y^2
ode1 = sp.Eq(y(x).diff(x), x * y(x)**2)
sol1 = sp.dsolve(ode1)
print("Separable:", sol1)
print("check:", sp.checkodesol(ode1, sol1))
# dividing by y^2 loses the constant solution y = 0; check it separately
print("y=0 check:", sp.checkodesol(ode1, sp.Eq(y(x), 0)))

# 2) Linear equation: y' + 2y = exp(x), y(0) = 1
ode2 = sp.Eq(y(x).diff(x) + 2 * y(x), sp.exp(x))
sol2 = sp.dsolve(ode2, ics={y(0): 1})
print("Linear IVP:", sol2)
print("check:", sp.checkodesol(ode2, sol2))

# Plot the IVP solution
f = sp.lambdify(x, sol2.rhs, "numpy")
xs = np.linspace(-1, 2, 300)
plt.figure(figsize=(6, 4))
plt.plot(xs, f(xs), lw=2, label=r"$y=\frac{e^{x}}{3}+\frac{2}{3}e^{-2x}$")
plt.plot([0], [1], "ko")
plt.xlabel("$x$"); plt.ylabel("$y$"); plt.grid(alpha=0.3); plt.legend()
plt.title(r"$y'+2y=e^{x},\ y(0)=1$")
plt.tight_layout()
plt.savefig("py01.png", dpi=100)
