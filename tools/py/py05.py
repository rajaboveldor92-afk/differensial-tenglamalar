# solve_ivp: logistic growth and an SIR-type virus spread in a computer network
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# Logistic model P' = r P (1 - P/K): users of a new app
r, K, P0 = 0.8, 1000.0, 10.0
logi = solve_ivp(lambda t, P: r * P * (1 - P / K), [0, 15], [P0],
                 dense_output=True, rtol=1e-9, atol=1e-9)
t = np.linspace(0, 15, 301)
P_exact = K / (1 + (K / P0 - 1) * np.exp(-r * t))
print("logistic: max |numeric - exact| =", f"{np.max(abs(logi.sol(t)[0] - P_exact)):.2e}")
print("logistic: P(15) =", f"{logi.sol(15)[0]:.2f}")

# SIR: S susceptible, I infected, R patched computers (fractions of N)
beta, gamma = 0.5, 0.1          # infection and repair rates per day
def sir(t, u):
    S, I, R = u
    return [-beta * S * I, beta * S * I - gamma * I, gamma * I]

sol = solve_ivp(sir, [0, 100], [0.99, 0.01, 0.0], dense_output=True,
                rtol=1e-9, atol=1e-11)
tt = np.linspace(0, 100, 1001)
S, I, R = sol.sol(tt)
k = np.argmax(I)
print("R0 = beta/gamma =", beta / gamma)
print(f"peak of infection: day {tt[k]:.1f}, I = {I[k]:.3f}")
print(f"never infected at the end: S(100) = {S[-1]:.3f}")
print(f"S+I+R at t=100: {S[-1] + I[-1] + R[-1]:.6f}")

fig, ax = plt.subplots(1, 2, figsize=(9, 3.6))
ax[0].plot(t, logi.sol(t)[0], lw=2)
ax[0].axhline(K, color="k", ls="--", lw=1)
ax[0].set_xlabel("$t$"); ax[0].set_ylabel("$P$")
ax[0].set_title("$P'=rP(1-P/K)$")
ax[1].plot(tt, S, label="$S$"); ax[1].plot(tt, I, label="$I$"); ax[1].plot(tt, R, label="$R$")
ax[1].set_xlabel("$t$"); ax[1].set_title("SIR"); ax[1].legend()
for a in ax: a.grid(alpha=0.3)
plt.tight_layout()
plt.savefig("py05.png", dpi=100)
