window.addEventListener('DOMContentLoaded', function(event) {
  var canvas = document.getElementById('sprinkles')
  var ctx = canvas.getContext('2d')
  var W = window.innerWidth
  var H = window.innerHeight
  canvas.width = W
  canvas.height = H

  var colors = [
    'rgba(239, 229, 120, .6)', // yellow
    'rgba(183, 229, 207, .6)', // mint
    'rgba(248, 202, 205, .6)', // pink
    'rgba(245, 84, 137, .6)',  // magenta
    'rgba(255, 255, 255, .6)'  // white
  ]

  // Generate array of sprinkles
  var MAX = 50
  var sprinkles = []
  for (var i = 0; i < MAX; i++) {
    sprinkles.push({
      x: Math.random() * W,                                 // x position (0-canvas width)
      y: Math.random() * H,                                 // y position (0-canvas height)
      l: Math.random() * 25 + 5,                            // length     (5 - 50)
      r: Math.floor(Math.random() * 360),                   // rotation   (0-360)
      c: colors[Math.floor(Math.random() * colors.length)], // color      (colors[0-N])
      v: Math.random() * 1 + 1                              // velocity   (1 - 2)
      // v: 1                              // velocity   (1 - 2)
    })
  }

  // Draw each sprinkle
  function draw () {
    ctx.clearRect(0, 0, W, H)
    sprinkles.forEach(function (s) {
      // save the canvas context
      ctx.save()

      // translate the context to the center point of the sprinkle and rotate,
      // translate back to 0,0 after rotation
      ctx.translate(s.x, s.y)
      ctx.rotate(s.r * Math.PI / 180)
      ctx.translate(-s.x, -s.y)

      // draw the sprinkle
      ctx.beginPath()
      ctx.moveTo(s.x - (s.l / 2), s.y)
      ctx.lineTo(s.x + (s.l / 2), s.y)
      ctx.lineWidth = 20
      ctx.strokeStyle = s.c
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.closePath()

      // restore the context to the normal non-rotated translation
      ctx.restore()
    })
    ctx.fill()
    update()
  }

  // update the sprinkles with new rotation and y position so they fall
  function update () {
    sprinkles.forEach(function (s, i) {
      s.y += 2 * s.v
      s.r = (s.r + 1) % 360
      // when sprinkles fall off the bottom, add them to the top again.
      if (s.y > H + 20) {
        sprinkles[i] = {
          x: Math.random() * W,
          y: -20,
          l: s.l,
          r: s.r,
          c: s.c,
          v: s.v
        }
      }
    })
    window.requestAnimationFrame(draw)
  }

  // kick off the drawing loop
  draw()
});
