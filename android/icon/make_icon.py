"""Draws the launcher icon: a direction field of y' = y(1 - y) with one integral curve (logistic), course colours."""
import math, os, sys
from PIL import Image, ImageDraw
OUT = sys.argv[1]
def draw(S):
    k = 4; W = S * k
    im = Image.new('RGBA', (W, W), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    r = int(W * 0.22)
    d.rounded_rectangle([0, 0, W - 1, W - 1], r, fill=(246, 242, 233, 255))
    # field
    def X(x): return W * (0.12 + 0.76 * (x + 2) / 4)
    def Y(y): return W * (0.88 - 0.76 * (y + 0.5) / 2)
    n = 7
    for i in range(n):
        for j in range(n):
            x = -2 + 4 * (i + .5) / n; y = -0.5 + 2 * (j + .5) / n
            s = y * (1 - y); dx, dy = 1, s
            px, py = dx * 0.76 / 4, -dy * 0.76 / 2; m = math.hypot(px, py); px, py = px / m, py / m
            L = W * 0.035
            cx, cy = X(x), Y(y)
            d.line([cx - px * L, cy - py * L, cx + px * L, cy + py * L], fill=(138, 148, 150, 255), width=max(2, int(W * 0.012)))
    # exact solution of y' = y(1 - y) through (-0.2, 0.1): y = 1 / (1 + 9 e^{-(x + 0.2)})
    rad = W * 0.026
    for t in range(1201):
        x = -2 + 4 * t / 1200; y = 1 / (1 + 9 * math.exp(-(x + 0.2)))
        d.ellipse([X(x) - rad, Y(y) - rad, X(x) + rad, Y(y) + rad], fill=(31, 95, 91, 255))
    d.ellipse([X(-0.2) - W * .045, Y(0.1) - W * .045, X(-0.2) + W * .045, Y(0.1) + W * .045], fill=(176, 72, 52, 255))
    return im.resize((S, S), Image.LANCZOS)
for name, S in [('mdpi', 48), ('hdpi', 72), ('xhdpi', 96), ('xxhdpi', 144), ('xxxhdpi', 192)]:
    p = os.path.join(OUT, 'mipmap-' + name); os.makedirs(p, exist_ok=True)
    draw(S).save(os.path.join(p, 'ic_launcher.png'))
draw(512).save(os.path.join(OUT, '..', 'icon', 'icon-512.png'))
