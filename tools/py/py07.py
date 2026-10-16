# 2D linear system x' = A x: eigenvalues and phase portrait
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

systems = {
    "saddle": np.array([[1.0, 1.0], [4.0, 1.0]]),
    "stable focus": np.array([[-0.5, 2.0], [-2.0, -0.5]]),
    "stable node": np.array([[-2.0, 1.0], [0.0, -1.0]]),
}

def classify(A):
    lam = np.linalg.eigvals(A)
    tr, det = np.trace(A), np.linalg.det(A)
    if det < 0:
        return lam, "saddle"
    if np.iscomplex(lam).any():
        if abs(tr) < 1e-12:
            return lam, "center"
        return lam, "stable focus" if tr < 0 else "unstable focus"
    return lam, "stable node" if tr < 0 else "unstable node"

def leave_box(t, u):
    return np.hypot(u[0], u[1]) - 4   # stop when the trajectory is far away
leave_box.terminal = True

fig, axes = plt.subplots(1, 3, figsize=(9, 3.3))
for ax, (name, A) in zip(axes, systems.items()):
    lam, kind = classify(A)
    vals, vecs = np.linalg.eig(A)
    print(f"{name}: A = {A.tolist()}")
    print(f"  eigenvalues = {np.round(lam, 4)}, tr = {np.trace(A):.2f}, det = {np.linalg.det(A):.2f} -> {kind}")
    X, Y = np.meshgrid(np.linspace(-2, 2, 17), np.linspace(-2, 2, 17))
    U = A[0, 0] * X + A[0, 1] * Y
    V = A[1, 0] * X + A[1, 1] * Y
    ax.streamplot(X, Y, U, V, density=0.9, color="0.6", linewidth=0.8)
    for th in np.linspace(0, 2 * np.pi, 7)[:-1]:
        x0 = [1.0 * np.cos(th + 0.3), 1.0 * np.sin(th + 0.3)]
        for T in (3, -3):   # forward and backward in time
            s = solve_ivp(lambda t, u: A @ u, [0, T], x0, max_step=0.02,
                          events=leave_box)
            ax.plot(s.y[0], s.y[1], lw=1.4, color=f"C{int(th)}")
    if np.isreal(vals).all():
        for v in vecs.T:   # straight-line solutions along eigenvectors
            v = np.real(v)
            ax.plot([-3 * v[0], 3 * v[0]], [-3 * v[1], 3 * v[1]], "k--", lw=1)
    ax.plot(0, 0, "ko")
    ax.set_xlim(-2, 2); ax.set_ylim(-2, 2); ax.set_aspect("equal")
    lam_txt = [f"{z.real:g}" if abs(z.imag) < 1e-12 else f"{z.real:g}{z.imag:+g}i" for z in lam]
    ax.set_title(f"{name}: " + ", ".join(lam_txt), fontsize=9)
    ax.set_xlabel("$x_1$"); ax.set_ylabel("$x_2$")
plt.tight_layout()
plt.savefig("py07.png", dpi=100)
