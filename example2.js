const example2 =
    `global
    sketch
    myp5

sketch = function (s)
    local
        insideRadius = 100
        outsideRadius = 150

    s.setup = function()
        local
            cnv = s.createCanvas(400, 400)
        cnv.parent("TOP")
        cnv.id("CAN")
        s.angleMode(s.DEGREES, 360, 255, 255)
        s.colorMode(s.HSB)

    s.draw = function()
        local
            centerX = s.width / 2
            centerY = s.height / 2
            angle = 0
            pointCount
            angleStep
            pointX
            pointY
        
        s.background(0)
        pointCount = s.map(s.mouseX, 0, s.width, 6, 60)
        pointCount = s.round(pointCount)

        s.fill(255)
        s.textSize(20)
        
        angleStep = 180.0 / pointCount

        s.beginShape(s.TRIANGLE_STRIP)
        for i = 0; i <= pointCount; i += 1
            pointX = centerX + s.cos(angle) * outsideRadius
            pointY = centerY + s.sin(angle) * outsideRadius
            s.fill(angle, 255, 255)
            s.vertex(pointX, pointY)
            angle += angleStep
            pointX = centerX + s.cos(angle) * insideRadius
            pointY = centerY + s.sin(angle) * insideRadius
            s.fill(angle, 255, 255)
            s.vertex(pointX, pointY)
            angle += angleStep
        s.endShape()
myp5 = new p5(sketch)`
