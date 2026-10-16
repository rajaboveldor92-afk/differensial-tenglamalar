# Heat equation u_t = a^2 u_xx on 0<x<L, u(0,t)=u(L,t)=0, u(x,0)=phi(x)
# Fourier solution u = sum b_n exp(-(n pi a/L)^2 t) sin(n pi x / L)
import numpy as np
import sympy as sp
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

L, a = 1.0, 1.0
xs_ = sp.symbols("x", positive=True)
n_ = sp.symbols("n", integer=True, positive=True)
phi = xs_ * (1 - xs_)                     # initial temperature
bn = sp.simplify(sp.Integer(2) * sp.integrate(phi * sp.sin(n_ * sp.pi * xs_), (xs_, 0, 1)))
print("b_n =", bn)
b = sp.lambdify(n_, bn, "numpy")

def u(x, t, N):
    s = np.zeros_like(x)
    for n in range(1, N + 1):
        s += b(n) * np.exp(-(n * np.pi * a / L)**2 * t) * np.sin(n * np.pi * x / L)
    return s

x = np.linspace(0, L, 201)
exact0 = x * (1 - x)
for N in [1, 3, 5, 15]:
    print(f"N={N:2d}: max |S_N(x,0) - phi(x)| = {np.max(abs(u(x, 0.0, N) - exact0)):.2e}")
print(f"u(0.5, 0.1) with N=15: {u(np.array([0.5]), 0.1, 15)[0]:.6f}")
print(f"one-term estimate     : {b(1) * np.exp(-np.pi**2 * 0.1):.6f}")

fig, ax = plt.subplots(1, 2, figsize=(9, 3.6))
ax[0].plot(x, exact0, "k", lw=3, alpha=0.3, label=r"$\varphi(x)$")
for N in [1, 3]:
    ax[0].plot(x, u(x, 0.0, N), label=f"$S_{N}$")
ax[0].set_title("$t=0$"); ax[0].legend()
for t in [0, 0.02, 0.05, 0.1, 0.2, 0.4]:
    ax[1].plot(x, u(x, t, 15), label=f"$t={t}$")
ax[1].set_title("$u_t=u_{xx}$"); ax[1].legend(fontsize=8)
for A in ax:
    A.set_xlabel("$x$"); A.set_ylabel("$u$"); A.grid(alpha=0.3)
plt.tight_layout()
plt.savefig("py08.png", dpi=100)
