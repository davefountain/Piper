const example3 =
`global
    sketch
    myp5

sketch = function (s)
    local
        angle

    s.setup = function ()
        local
            cnv = s.createCanvas(400, 400)
        cnv.parent("TOP")
        cnv.id("CAN")
        s.colorMode(s.HSB)
        s.angleMode(s.DEGREES)
    
    s.draw = function () 
        s.background(0)
        angle = (s.mouseX / s.width) * 90
        angle = s.min(angle, 90)
        s.translate(s.width / 2, s.height)
        s.stroke(0, 255, 255)
        s.line(0, 0, 0, -120)
        s.translate(0, -120)
        s.branch(120, 0)
    
    s.branch = function (h, level)
        s.stroke(level * 25, 255, 255)
        h *= 0.66
        if h > 2 
            s.push()
            s.rotate(angle)
            s.line(0, 0, 0, -h)
            s.translate(0, -h)
            s.branch(h, level + 1)
            s.pop()
            s.push()
            s.rotate(-angle)
            s.line(0, 0, 0, -h)
            s.translate(0, -h)
            s.branch(h, level + 1)
            s.pop()
myp5 = new p5(sketch)`