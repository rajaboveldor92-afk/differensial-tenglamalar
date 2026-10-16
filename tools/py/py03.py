# Euler's method by hand for y' = y, y(0) = 1 on [0, 1]; exact y = e^x
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

def f(x, y):
    return y

def euler(f, x0, y0, h, n):
    xs, ys = [x0], [y0]
    for k in range(n):
        y0 = y0 + h * f(x0, y0)   # y_{k+1} = y_k + h f(x_k, y_k)
        x0 = x0 + h
        xs.append(x0); ys.append(y0)
    return np.array(xs), np.array(ys)

h = 0.2
xs, ys = euler(f, 0.0, 1.0, h, 5)
print(" k    x_k     y_k       exact     error")
for k, (xk, yk) in enumerate(zip(xs, ys)):
    ex = np.exp(xk)
    print(f"{k:2d}  {xk:.2f}  {yk:.6f}  {ex:.6f}  {ex - yk:.6f}")

print("\nGlobal error at x=1 for several h:")
for h in [0.2, 0.1, 0.05, 0.025]:
    n = round(1 / h)
    _, yh = euler(f, 0.0, 1.0, h, n)
    print(f"h={h:<6} error={np.e - yh[-1]:.6f}")

t = np.linspace(0, 1, 200)
plt.figure(figsize=(6, 4))
plt.plot(t, np.exp(t), "k", lw=2, label="$e^x$")
xs, ys = euler(f, 0.0, 1.0, 0.2, 5)
plt.plot(xs, ys, "o-", label="Euler, $h=0.2$")
xs, ys = euler(f, 0.0, 1.0, 0.1, 10)
plt.plot(xs, ys, "s-", ms=4, label="Euler, $h=0.1$")
plt.xlabel("$x$"); plt.ylabel("$y$"); plt.title("$y'=y,\\ y(0)=1$")
plt.grid(alpha=0.3); plt.legend()
plt.tight_layout()
plt.savefig("py03.png", dpi=100)
