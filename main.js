var yyy = document.getElementById('xxx') //从id中获取yyy
var context = yyy.getContext('2d') //获取2d上下文

autoSetCanvasSize(yyy)

/********************/

listenToUser(yyy)

/*****************/

var eraserEnabled = false

eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}

brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
}

/**************/

function autoSetCanvasSize(canvas) {
    WH()

    window.onresize = function () { //页面变化时 再次调试
        WH()
    }

    function WH() { //封装高度宽度
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) { //画圆//封装函数
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) { //封装
    context.beginPath() //开始
    context.strokeStyle = 'black'
    context.moveTo(x1, y1) //起点
    context.lineWidth = 5 //粗细
    context.lineTo(x2, y2) //终点
    context.stroke() //描边
    context.closePath() //结束
}

function listenToUser(canvas) {
    var using = false //是否开始使用
    var lastPoint = {
        x: undefined,
        y: undefined
    } //声明第一个点

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (aaa) {
            console.log('mo')
            var x = aaa.touches[0].clientX //相对于窗口 而不是canvas
            var y = aaa.touches[0].clientY//多点触控,只获取单点
            using = true //是
            // console.log(lastPoint)
            //drawCircle(x, y, 1) //获取xy并画圈
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                } //获取点的位置
            }
        }

        canvas.ontouchmove = function (aaa) {
            console.log('yizhimo')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = {
                    "x": x,
                    "y": y
                } //获取新点的位置
                //drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) //新点与旧点相连成线
                lastPoint = newPoint //旧点等于新点}
            }
        }

        canvas.ontouchend = function (aaa) {
            console.log('ting')
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX //相对于窗口 而不是canvas
            var y = aaa.clientY
            using = true //是
            // console.log(lastPoint)
            //drawCircle(x, y, 1) //获取xy并画圈
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                } //获取点的位置
            }
        }

        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = {
                    "x": x,
                    "y": y
                } //获取新点的位置
                //drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) //新点与旧点相连成线
                lastPoint = newPoint //旧点等于新点}
            }
        }

        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}