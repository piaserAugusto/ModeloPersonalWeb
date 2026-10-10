Add-Type -AssemblyName System.Drawing

# ---------------------------------------------------------------- paletas
$ink       = [System.Drawing.Color]::FromArgb(255, 31, 41, 55)    # traje
$inkDark   = [System.Drawing.Color]::FromArgb(255, 22, 30, 41)    # solapas
$shirt     = [System.Drawing.Color]::FromArgb(255, 250, 250, 250)  # camisa
$shirtSh   = [System.Drawing.Color]::FromArgb(255, 226, 232, 240)  # sombra camisa
$tie       = [System.Drawing.Color]::FromArgb(255, 18, 128, 124)   # corbata (verde marca)
$tieSh     = [System.Drawing.Color]::FromArgb(255, 10, 92, 89)
$skin      = [System.Drawing.Color]::FromArgb(255, 226, 184, 152)
$skinSh    = [System.Drawing.Color]::FromArgb(255, 205, 158, 126)
$hair      = [System.Drawing.Color]::FromArgb(255, 45, 42, 40)
$bg        = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)

function P([double]$x, [double]$y) { New-Object System.Drawing.PointF($x, $y) }

# ============================================================ abogado.png
$W = 900; $H = 1250
$bmp = New-Object System.Drawing.Bitmap($W, $H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear($bg)

function Brush($c) { New-Object System.Drawing.SolidBrush($c) }
function Poly($pts, $c) {
    $g.FillPolygon((Brush $c), [System.Drawing.PointF[]]($pts))
}
function SmoothClosed($pts, $c, $tension = 0.5) {
    # AddCurve no cierra la figura: repetimos el primer punto para que la
    # spline cierre sola y el relleno no tenga bordes rectos.
    $list = New-Object System.Collections.ArrayList
    foreach ($pt in $pts) { [void]$list.Add($pt) }
    [void]$list.Add($pts[0])
    $arr = [System.Drawing.PointF[]]$list.ToArray()
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddCurve($arr, [float]$tension)
    $g.FillPath((Brush $c), $path)
    $path.Dispose()
}

# --- cuello
$g.FillRectangle((Brush $skinSh), 405, 360, 90, 120)

# --- traje (hombros caidos, recorte a la cintura)
SmoothClosed @(
    (P 188 640), (P 200 560), (P 236 502), (P 306 466),
    (P 372 444), (P 450 486), (P 528 444), (P 594 466),
    (P 664 502), (P 700 560), (P 712 640), (P 748 $H),
    (P 152 $H)
) $ink 0.45

# --- sombra del lado izquierdo del traje
Poly @(
    (P 188 640), (P 200 560), (P 236 502), (P 306 466),
    (P 372 444), (P 400 452), (P 372 700), (P 330 $H), (P 152 $H)
) $inkDark

# --- camisa
SmoothClosed @(
    (P 372 444), (P 450 492), (P 528 444),
    (P 566 560), (P 520 700), (P 450 900),
    (P 380 700), (P 334 560)
) $shirt 0.4

# --- cuello de camisa
Poly @(
    (P 400 440), (P 450 484), (P 500 440),
    (P 486 500), (P 450 520), (P 414 500)
) $shirtSh

# --- corbata
SmoothClosed @(
    (P 432 520), (P 468 520), (P 486 566),
    (P 462 660), (P 450 690), (P 438 660), (P 414 566)
) $tie 0.35
SmoothClosed @(
    (P 436 700), (P 464 700), (P 480 880), (P 450 960), (P 420 880)
) $tieSh 0.35

# --- solapas
Poly @(
    (P 372 444), (P 450 492), (P 420 700), (P 330 900), (P 300 620)
) $inkDark
Poly @(
    (P 528 444), (P 450 492), (P 480 700), (P 570 900), (P 600 620)
) $inkDark

# --- cabeza
$g.FillEllipse((Brush $skin), 377, 160, 146, 198)
# orejas
$g.FillEllipse((Brush $skinSh), 366, 232, 20, 42)
$g.FillEllipse((Brush $skinSh), 514, 232, 20, 42)
# cuello visible
$g.FillRectangle((Brush $skin), 415, 330, 70, 60)

# --- pelo
SmoothClosed @(
    (P 374 246), (P 382 168), (P 430 126), (P 470 126),
    (P 520 168), (P 528 246), (P 528 206), (P 496 170),
    (P 404 170), (P 374 206)
) $hair 0.4
# sombra del pelo hacia la frente
$g.FillEllipse((Brush $hair), 396, 132, 108, 74)

# --- bolsillo con pañuelo
Poly @(
    (P 606 900), (P 648 890), (P 650 916), (P 608 926)
) $shirt

$bmp.Save((Join-Path (Split-Path -Parent $PSScriptRoot) "public\abogado.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

# ============================================================ hero-poster.jpg
$W2 = 1920; $H2 = 1080
$bmp2 = New-Object System.Drawing.Bitmap($W2, $H2)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

$deep = [System.Drawing.Color]::FromArgb(255, 2, 64, 63)
$mid  = [System.Drawing.Color]::FromArgb(255, 6, 77, 75)
$dark = [System.Drawing.Color]::FromArgb(255, 1, 38, 37)

$rect = New-Object System.Drawing.Rectangle(0, 0, $W2, $H2)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $mid, $dark, 25)
$g2.FillRectangle($grad, $rect)

# bokeh suave
$rnd = New-Object System.Random(42)
foreach ($k in 1..26) {
    $x = $rnd.Next(0, $W2)
    $y = $rnd.Next(0, $H2)
    $r = $rnd.Next(60, 300)
    $a = $rnd.Next(6, 20)
    $b = Brush ([System.Drawing.Color]::FromArgb($a, 255, 255, 255))
    $g2.FillEllipse($b, $x - $r, $y - $r, $r * 2, $r * 2)
}

# lineas diagonales sutiles (evoca arquitectura / documentos)
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(14, 255, 255, 255)), 2
foreach ($k in 1..14) {
    $x = -400 + ($k * 190)
    $g2.DrawLine($pen, $x, $H2, $x + 700, 0)
}

$bmp2.Save((Join-Path (Split-Path -Parent $PSScriptRoot) "public\hero-poster.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g2.Dispose(); $bmp2.Dispose()

Write-Output "OK: abogado.png y hero-poster.jpg regenerados"