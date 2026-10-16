# Direction field and integral curves of y' = x - y
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

def f(x, y):
    return x - y

# Unit-length direction segments (1, f) normalised
X, Y = np.meshgrid(np.linspace(-3, 3, 21), np.linspace(-3, 3, 21))
S = f(X, Y)
N = np.sqrt(1 + S**2)
U, V = 1 / N, S / N

plt.figure(figsize=(6, 6))
plt.quiver(X, Y, U, V, angles="xy", pivot="mid", headwidth=1, headlength=0,
           headaxislength=0, color="gray", width=0.003)

# Integral curves through several initial points (exact: y = x - 1 + C e^{-x})
for y0 in [-3, -2, -1, 0, 1, 2, 3]:
    sol = solve_ivp(f, [-3, 3], [y0 + 0.0], dense_output=True, rtol=1e-8)
    t = np.linspace(-3, 3, 200)
    plt.plot(t, sol.sol(t)[0], lw=1.6)
    # compare with exact solution at x = 3
    C = (y0 + 3 + 1) * np.exp(-3)
    exact = 3 - 1 + C * np.exp(-3)
    print(f"y(-3)={y0:+d}: numeric y(3)={sol.sol(3)[0]:.6f}, exact={exact:.6f}")

# Isocline f = 0 (y = x): slopes are horizontal there
plt.plot([-3, 3], [-3, 3], "k--", lw=1, label="$y=x$ (isocline $k=0$)")
plt.plot([-3, 3], [-4, 2], "r:", lw=2, label="$y=x-1$")
plt.xlim(-3, 3); plt.ylim(-3, 3)
plt.xlabel("$x$"); plt.ylabel("$y$"); plt.title("$y'=x-y$")
plt.legend(loc="upper left"); plt.gca().set_aspect("equal")
plt.tight_layout()
plt.savefig("py02.png", dpi=100)
