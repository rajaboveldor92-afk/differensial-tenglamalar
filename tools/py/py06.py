# Damped and forced oscillator: x'' + 2*zeta*w0*x' + w0^2 x = F cos(w t)
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

w0, F = 2.0, 1.0

def rhs(t, u, zeta, w, F):
    x, v = u
    return [v, F * np.cos(w * t) - 2 * zeta * w0 * v - w0**2 * x]

def amplitude(zeta, w):
    # steady-state amplitude of the particular solution
    return F / np.sqrt((w0**2 - w**2)**2 + (2 * zeta * w0 * w)**2)

# Time histories: free damped motion and forced motion near resonance
t = np.linspace(0, 30, 1500)
free = solve_ivp(rhs, [0, 30], [1, 0], t_eval=t, args=(0.1, 0.0, 0.0), rtol=1e-8)
forced = solve_ivp(rhs, [0, 30], [0, 0], t_eval=t, args=(0.1, w0, F), rtol=1e-8)
print(f"free damped motion: x(30) = {free.y[0][-1]:.4f}, envelope e^(-0.2*30) = {np.exp(-0.1*w0*30):.4f}")
late = forced.y[0][t > 20]
print(f"forced at w=w0: numeric amplitude ~ {late.max():.4f}, theory {amplitude(0.1, w0):.4f}")

for zeta in [0.05, 0.1, 0.25, 0.5]:
    ws = np.linspace(0.01, 4, 4000)
    A = amplitude(zeta, ws)
    print(f"zeta={zeta:<5} peak at w={ws[np.argmax(A)]:.3f}, A_max={A.max():.3f}")

fig, ax = plt.subplots(1, 2, figsize=(9, 3.6))
ax[0].plot(t, forced.y[0], lw=1.2, label=r"$\omega=\omega_0$")
ax[0].plot(t, free.y[0], lw=1.2, label="$F=0$, $x(0)=1$")
ax[0].set_xlabel("$t$"); ax[0].set_ylabel("$x$"); ax[0].legend(fontsize=8)
ws = np.linspace(0.01, 4, 400)
for zeta in [0.05, 0.1, 0.25, 0.5]:
    ax[1].plot(ws, amplitude(zeta, ws), label=rf"$\zeta={zeta}$")
ax[1].axvline(w0, color="k", ls="--", lw=1)
ax[1].set_xlabel(r"$\omega$"); ax[1].set_ylabel("$A(\\omega)$"); ax[1].legend(fontsize=8)
for a in ax: a.grid(alpha=0.3)
plt.tight_layout()
plt.savefig("py06.png", dpi=100)
