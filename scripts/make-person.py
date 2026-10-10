"""
Genera public/abogado.png: ilustracion flat de medio cuerpo, fondo transparente.
Curvas bezier + supersampling 4x para bordes suaves. Sin dependencias extra.
"""
import math
from PIL import Image, ImageDraw

W, H = 900, 1250
SS = 4  # supersampling

# ----------------------------------------------------------------- paleta
SKIN      = (240, 196, 160, 255)
SKIN_SH   = (219, 168, 133, 255)
SKIN_DEEP = (201, 148, 116, 255)
HAIR      = (43, 39, 36, 255)
HAIR_HI   = (62, 56, 51, 255)
JACKET    = (44, 58, 71, 255)
JACKET_SH = (32, 43, 54, 255)
SHIRT     = (255, 255, 255, 255)
SHIRT_SH  = (228, 235, 240, 255)
TIE       = (10, 92, 89, 255)
TIE_SH    = (7, 71, 69, 255)
FRAME     = (31, 42, 51, 255)
MOUTH     = (140, 74, 74, 255)
LIP       = (198, 116, 108, 255)


def bez(p0, p1, p2, p3, n=48):
    """Puntos de una curva bezier cubica."""
    out = []
    for i in range(n + 1):
        t = i / n
        m = 1 - t
        out.append((
            m**3 * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t**3 * p3[0],
            m**3 * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t**3 * p3[1],
        ))
    return out


def chain(*segments):
    """Concatena varios segmentos bezier en una sola polilinea."""
    pts = []
    for seg in segments:
        s = bez(*seg)
        pts.extend(s if not pts else s[1:])
    return pts


def s(pts):
    """Escala los puntos al lienzo de supersampling."""
    return [(x * SS, y * SS) for x, y in pts]


img = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0))
d = ImageDraw.Draw(img)


def fill(pts, color):
    d.polygon(s(pts), fill=color)


def stroke(pts, color, width, closed=False):
    p = s(pts)
    if closed:
        p = p + [p[0]]
    d.line(p, fill=color, width=int(width * SS), joint="curve")
    r = width * SS / 2
    for x, y in (p[0], p[-1]):
        d.ellipse([x - r, y - r, x + r, y + r], fill=color)


def ellipse(box, color):
    d.ellipse([v * SS for v in box], fill=color)


def rrect(box, radius, color, outline=None, width=0):
    d.rounded_rectangle(
        [v * SS for v in box],
        radius=radius * SS,
        fill=color,
        outline=outline,
        width=int(width * SS),
    )


# ================================================================== CABEZA
# Craneo y mandibula, simetrica alrededor de x=450
head = chain(
    ((450, 150), (512, 150), (548, 200), (548, 268)),   # craneo der.
    ((548, 268), (548, 330), (546, 356), (536, 384)),   # mejilla der.
    ((536, 384), (524, 424), (486, 446), (450, 448)),   # mandibula der.
    ((450, 448), (414, 446), (376, 424), (364, 384)),   # mandibula izq.
    ((364, 384), (354, 356), (352, 330), (352, 268)),   # mejilla izq.
    ((352, 268), (352, 200), (388, 150), (450, 150)),   # craneo izq.
)
fill(head, SKIN)

# orejas
ellipse([336, 292, 372, 348], SKIN_SH)
ellipse([528, 292, 564, 348], SKIN_SH)

# sombra suave del lado derecho del rostro (capa aparte, con alpha)
shade = chain(
    ((548, 262), (548, 330), (546, 356), (536, 384)),
    ((536, 384), (524, 424), (486, 446), (450, 448)),
    ((450, 448), (446, 400), (470, 320), (472, 250)),
    ((472, 250), (500, 240), (528, 244), (548, 262)),
)
fill(shade, SKIN_DEEP)
shade_layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
ImageDraw.Draw(shade_layer).polygon(s(shade), fill=(201, 148, 116, 90))
img.alpha_composite(shade_layer)
d = ImageDraw.Draw(img)

# ================================================================== PELO
hair = chain(
    ((346, 306), (346, 214), (382, 130), (450, 124)),   # exterior izq.
    ((450, 124), (518, 130), (554, 214), (554, 306)),   # exterior der.
    ((554, 306), (536, 238), (498, 214), (452, 216)),   # flequillo
    ((452, 216), (410, 220), (372, 238), (346, 306)),   # flequillo izq.
)
fill(hair, HAIR)
# mechones
stroke([(392, 150), (430, 176), (486, 178)], HAIR_HI, 7)
stroke([(508, 168), (536, 200), (546, 250)], HAIR_HI, 6)

# ================================================================== CUELLO
rrect([400, 396, 500, 528], 26, SKIN)
# sombra bajo la mandibula
j = Image.new("RGBA", img.size, (0, 0, 0, 0))
ImageDraw.Draw(j).ellipse([396 * SS, 396 * SS, 504 * SS, 476 * SS],
                          fill=(201, 148, 116, 120))
img.alpha_composite(j)
d = ImageDraw.Draw(img)

# ================================================================== SACO
torso = chain(
    ((388, 512), (280, 556), (176, 660), (128, 800)),   # hombro izq.
    ((128, 800), (104, 950), (92, 1100), (86, 1250)),    # brazo izq.
    ((86, 1250), (300, 1250), (600, 1250), (814, 1250)),  # base
    ((814, 1250), (808, 1100), (796, 950), (772, 800)),  # brazo der.
    ((772, 800), (724, 660), (620, 556), (512, 512)),    # hombro der.
)
fill(torso, JACKET)
# sombra lateral izquierda del saco
torso_sh = chain(
    ((388, 512), (280, 556), (176, 660), (128, 800)),
    ((128, 800), (104, 950), (92, 1100), (86, 1250)),
    ((300, 1250), (250, 1000), (268, 700), (388, 512)),
)
fill(torso_sh, JACKET_SH)

# ================================================================== CAMISA
shirt = chain(
    ((398, 508), (412, 548), (438, 568), (450, 572)),
    ((450, 572), (462, 568), (488, 548), (502, 508)),
    ((502, 508), (528, 640), (500, 760), (450, 902)),
    ((450, 902), (400, 760), (372, 640), (398, 508)),
)
fill(shirt, SHIRT)
# cuello de camisa
fill([(410, 502), (450, 546), (490, 502), (476, 494),
      (450, 528), (424, 494)], SHIRT_SH)

# ================================================================== CORBATA
fill([(430, 560), (470, 560), (484, 610), (450, 664),
      (416, 610)], TIE)
tie_tail = chain(
    ((436, 668), (464, 668), (482, 800), (462, 906)),
    ((462, 906), (444, 926), (426, 906), (418, 800)),
)
fill(tie_tail, TIE)
tie_tail_sh = chain(
    ((452, 668), (464, 668), (482, 800), (462, 906)),
    ((462, 906), (452, 914), (444, 914), (448, 800)),
)
fill(tie_tail_sh, TIE_SH)

# ================================================================== SOLAPAS
fill([(388, 512), (450, 566), (428, 706), (326, 892),
      (296, 636)], JACKET_SH)
fill([(512, 512), (450, 566), (472, 706), (574, 892),
      (604, 636)], JACKET_SH)
# brillos del borde de la solapa
stroke([(388, 514), (450, 568), (428, 708)], (86, 104, 120, 255), 4)
stroke([(512, 514), (450, 568), (472, 708)], (86, 104, 120, 255), 4)

# ================================================================== OJOS
# Proporcion clasica: ojos al 50% de la distancia coronilla-menton.
for ex in (410, 490):
    ellipse([ex - 17, 276, ex + 17, 302], (250, 250, 248, 255))
    ellipse([ex - 11, 280, ex + 11, 300], (58, 46, 40, 255))
    ellipse([ex - 5, 283, ex + 1, 290], (255, 255, 255, 235))
# cejas
stroke([(390, 256), (408, 246), (430, 250)], HAIR, 9)
stroke([(470, 250), (492, 246), (510, 256)], HAIR, 9)

# nariz
stroke([(452, 310), (444, 338), (462, 342)], SKIN_DEEP, 6)

# ================================================================== BOCA
smile = chain(
    ((414, 358), (432, 390), (468, 390), (486, 358)),
    ((486, 358), (468, 374), (432, 374), (414, 358)),
)
fill(smile, MOUTH)
fill([(420, 362), (450, 352), (480, 362), (450, 372)], (252, 250, 248, 255))
fill([(424, 390), (450, 400), (476, 390), (450, 384)], LIP)

# ================================================================== LENTES
for ex in (410, 490):
    rrect([ex - 34, 264, ex + 34, 310], 16, None, outline=FRAME, width=5)
stroke([(376, 276), (352, 272)], FRAME, 4)   # varilla izq.
stroke([(524, 276), (548, 272)], FRAME, 4)   # varilla der.
stroke([(444, 282), (456, 282)], FRAME, 5)   # puente

# ----------------------------------------------------------------- salida
out = img.resize((W, H), Image.LANCZOS)
out.save("public/abogado.png", "PNG")
print(f"public/abogado.png  {W}x{H}  RGBA  {out.mode}")