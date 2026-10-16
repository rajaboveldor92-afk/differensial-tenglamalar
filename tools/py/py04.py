# Order of accuracy: Euler, Heun (improved Euler), RK4
# Test problem y' = -2xy, y(0) = 1, exact y = exp(-x^2), error at x = 1
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

def f(x, y):
    return -2 * x * y

def euler_step(f, x, y, h):
    return y + h * f(x, y)

def heun_step(f, x, y, h):
    k1 = f(x, y)
    k2 = f(x + h, y + h * k1)
    return y + h / 2 * (k1 + k2)

def rk4_step(f, x, y, h):
    k1 = f(x, y)
    k2 = f(x + h / 2, y + h / 2 * k1)
    k3 = f(x + h / 2, y + h / 2 * k2)
    k4 = f(x + h, y + h * k3)
    return y + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4)

def solve(step, h):
    n = round(1 / h)
    x, y = 0.0, 1.0
    for _ in range(n):
        y = step(f, x, y, h)
        x += h
    return y

exact = np.exp(-1.0)
hs = [0.1, 0.05, 0.025, 0.0125]
methods = {"Euler": euler_step, "Heun": heun_step, "RK4": rk4_step}
errors = {}
for name, step in methods.items():
    errs = [abs(solve(step, h) - exact) for h in hs]
    errors[name] = errs
    print(name)
    for i, h in enumerate(hs):
        ratio = errs[i - 1] / errs[i] if i > 0 else float("nan")
        print(f"  h={h:<7} error={errs[i]:.3e}  ratio={ratio:6.2f}")

# Ratio ~2 -> order 1, ~4 -> order 2, ~16 -> order 4
plt.figure(figsize=(6, 4.5))
for name, mk in zip(methods, ["o", "s", "^"]):
    plt.loglog(hs, errors[name], mk + "-", label=name)
plt.xlabel("$h$"); plt.ylabel("$|y_n - y(1)|$")
plt.title("$y'=-2xy,\\ y(0)=1$")
plt.grid(alpha=0.3, which="both"); plt.legend()
plt.tight_layout()
plt.savefig("py04.png", dpi=100)
