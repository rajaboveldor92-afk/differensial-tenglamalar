# Vibrating string u_tt = c^2 u_xx on the whole line, u(x,0)=f(x), u_t(x,0)=0
# d'Alembert: u(x,t) = (f(x - c t) + f(x + c t)) / 2
import numpy as np
import sympy as sp
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

c = 1.0
def f(x):
    return np.maximum(0, 1 - np.abs(x))   # triangular pluck

def u(x, t):
    return 0.5 * (f(x - c * t) + f(x + c * t))

# symbolic check of d'Alembert's formula for a smooth profile
X, T, C = sp.symbols("x t c")
F = sp.Function("F")
U = (F(X - C * T) + F(X + C * T)) / 2
print("u_tt - c^2 u_xx =", sp.simplify(U.diff(T, 2) - C**2 * U.diff(X, 2)))
print("u(x,0) =", U.subs(T, 0), "  u_t(x,0) =", sp.simplify(U.diff(T).subs(T, 0)))

x = np.linspace(-5, 5, 1001)
times = [0, 0.5, 1, 1.5, 2, 3]
for t in times:
    print(f"t={t:<4} u(0,t) = {u(0.0, t):.3f}   u(ct,t) = {u(c * t, t):.3f}")

fig, axes = plt.subplots(len(times), 1, figsize=(6, 7), sharex=True)
for ax, t in zip(axes, times):
    ax.plot(x, u(x, t), lw=2)
    ax.plot(x, 0.5 * f(x - c * t), "--", lw=1, color="C1")
    ax.plot(x, 0.5 * f(x + c * t), ":", lw=1, color="C2")
    ax.set_ylim(-0.1, 1.1); ax.set_yticks([0, 1])
    ax.text(-4.8, 0.7, f"$t={t}$")
    ax.grid(alpha=0.3)
axes[-1].set_xlabel("$x$")
axes[0].set_title(r"$u=\frac{1}{2}[f(x-ct)+f(x+ct)]$")
plt.tight_layout()
plt.savefig("py09.png", dpi=100)
