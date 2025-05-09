const example1 =
`global
    sketch
    myp5

sketch = function (s)
    s.setup = function()
        local
            cnv = s.createCanvas(400, 600)
        cnv.parent("TOP")
        cnv.id("CAN")

    s.draw = function()
        s.background(0)
        s.fill("orange")
        s.circle(s.mouseX, s.mouseY, 20)

myp5 = new p5(sketch);`
