Add-Type -AssemblyName System.Drawing

$app = Join-Path (Split-Path -Parent $PSScriptRoot) "app"

$brand = [System.Drawing.Color]::FromArgb(255, 2, 64, 63)
$brandLight = [System.Drawing.Color]::FromArgb(255, 10, 92, 89)
$white = [System.Drawing.Color]::FromArgb(255, 255, 255)

function Brush($c) { New-Object System.Drawing.SolidBrush($c) }
function P([double]$x, [double]$y) { New-Object System.Drawing.PointF($x, $y) }

# Dibuja la balanza en un lienzo de lado $S con margen proporcional.
function Draw-Scales($g, $S) {
    $u = $S / 100.0   # unidad relativa

    # --- base (triangulo)
    $base = @((P (30 * $u) (82 * $u)), (P (70 * $u) (82 * $u)), (P (50 * $u) (62 * $u)))
    $g.FillPolygon((Brush $white), [System.Drawing.PointF[]]$base)

    # --- poste
    $g.FillRectangle((Brush $white), (47 * $u), (26 * $u), (6 * $u), (40 * $u))

    # --- travesano
    $g.FillRectangle((Brush $white), (18 * $u), (25 * $u), (64 * $u), (5 * $u))

    # --- perilla superior
    $g.FillEllipse((Brush $white), (45 * $u), (18 * $u), (10 * $u), (10 * $u))

    # --- fieltros y placas
    $thick = [Math]::Max(1.0, 1.8 * $u)
    foreach ($cx in @(22, 78)) {
        # hilos
        $pen = [System.Drawing.Pen]::new([System.Drawing.Color]::White, [float]$thick)
        $g.DrawLine($pen, [float]($cx * $u), [float](30 * $u), [float](($cx - 11) * $u), [float](54 * $u))
        $g.DrawLine($pen, [float]($cx * $u), [float](30 * $u), [float](($cx + 11) * $u), [float](54 * $u))
        $g.DrawLine($pen, [float]($cx * $u), [float](30 * $u), [float]($cx * $u), [float](54 * $u))
        $pen.Dispose()
        # plato (medio arco)
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddArc([float](($cx - 13) * $u), [float](52 * $u), [float](26 * $u), [float](16 * $u), 0, 180)
        $path.CloseFigure()
        $g.FillPath((Brush $white), $path)
        $path.Dispose()
    }
}

# ------------------------------------------------------------- icon.png 512
$S = 512
$bmp = New-Object System.Drawing.Bitmap($S, $S, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::Transparent)

$rect = New-Object System.Drawing.Rectangle(0, 0, $S, $S)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $brandLight, $brand, 45)
$g.FillRectangle($grad, $rect)

Draw-Scales $g $S
$g.Dispose()
$bmp.Save((Join-Path $app "icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# El PNG de 512 tambien sirve como favicon.ico (ICO con PNG embebido).
$png512 = [System.IO.File]::ReadAllBytes((Join-Path $app "icon.png"))

# --------------------------------------------------------- apple-icon.png
$apple = New-Object System.Drawing.Bitmap(180, 180, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$ga = [System.Drawing.Graphics]::FromImage($apple)
$ga.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ga.Clear([System.Drawing.Color]::Transparent)
$ra = New-Object System.Drawing.Rectangle(0, 0, 180, 180)
$ga.FillRectangle((New-Object System.Drawing.Drawing2D.LinearGradientBrush($ra, $brandLight, $brand, 45)), $ra)
Draw-Scales $ga 180
$ga.Dispose()
$apple.Save((Join-Path $app "apple-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$apple.Dispose()

# ----------------------------------------------------------- favicon.ico
function New-Ico32([byte[]]$pngBytes, [string]$outPath) {
    $fs = [System.IO.File]::Open($outPath, [System.IO.FileMode]::Create)
    $bw = New-Object System.IO.BinaryWriter($fs)
    # ICONDIR
    $bw.Write([UInt16]0)          # reservado
    $bw.Write([UInt16]1)          # tipo 1 = icono
    $bw.Write([UInt16]1)          # cantidad de imagenes
    # ICONDIRENTRY
    $bw.Write([Byte]32)           # ancho
    $bw.Write([Byte]32)           # alto
    $bw.Write([Byte]0)            # colores
    $bw.Write([Byte]0)            # reservado
    $bw.Write([UInt16]1)          # planos
    $bw.Write([UInt16]32)         # bits por pixel
    $bw.Write([UInt32]$pngBytes.Length)
    $bw.Write([UInt32]22)         # offset del bitmap
    # PNG embebido
    $bw.Write($pngBytes)
    $bw.Flush(); $bw.Dispose(); $fs.Dispose()
}

# Render 32x32 especifico para el .ico
$small = New-Object System.Drawing.Bitmap(32, 32, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g32 = [System.Drawing.Graphics]::FromImage($small)
$g32.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g32.Clear([System.Drawing.Color]::Transparent)
$r32 = New-Object System.Drawing.Rectangle(0, 0, 32, 32)
$g32.FillRectangle((New-Object System.Drawing.Drawing2D.LinearGradientBrush($r32, $brandLight, $brand, 45)), $r32)
Draw-Scales $g32 32
$g32.Dispose()
$tmp32 = Join-Path $env:TEMP "favicon-32.png"
$small.Save($tmp32, [System.Drawing.Imaging.ImageFormat]::Png)
$small.Dispose()
New-Ico32 ([System.IO.File]::ReadAllBytes($tmp32)) (Join-Path $app "favicon.ico")
Remove-Item $tmp32 -Force

# -------------------------------------------------------- icon.svg (nativo)
$svg = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Balanza de justicia">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a5c59"/>
      <stop offset="1" stop-color="#02403f"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#b)"/>
  <g fill="#ffffff">
    <circle cx="256" cy="102" r="26"/>
    <rect x="92" y="128" width="328" height="26" rx="4"/>
    <rect x="241" y="133" width="30" height="205"/>
    <path d="M154 419h204l-102-102z"/>
  </g>
  <g stroke="#ffffff" stroke-width="9" stroke-linecap="round" fill="none">
    <path d="M102 154 46 276M102 154l-56 122M102 154v122"/>
    <path d="M410 154l-56 122M410 154l56 122M410 154v122"/>
  </g>
  <g fill="#ffffff">
    <path d="M46 276a56 56 0 0 0 112 0z"/>
    <path d="M354 276a56 56 0 0 0 112 0z"/>
  </g>
</svg>
'@
[System.IO.File]::WriteAllText((Join-Path $app "icon.svg"), $svg, (New-Object System.Text.UTF8Encoding($false)))

Get-ChildItem $app -Filter "icon*" | ForEach-Object { "  $($_.Name)  $($_.Length) bytes" }
"  favicon.ico  $((Get-Item (Join-Path $app 'favicon.ico')).Length) bytes"