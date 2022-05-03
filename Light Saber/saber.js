const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
let mouseAngle

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX - canvas.width / 2
    mouse.y = event.clientY - canvas.width / 2

    mouseAngle = Math.atan2(mouse.y, mouse.x)
})


addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
class Particle {
    constructor(x, y, radius, color, distFromCenter) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.distFromCenter = distFromCenter
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update(angle) {
        this.draw()
        this.x = center.x + Math.cos(angle) * this.distFromCenter
        this.y = center.y + Math.sin(angle) * this.distFromCenter
    }
}

// Implementation
let particles

function init() {
    particles = []

    const hueIncrement = 360 / 500
    for (let i = 0; i < 500; i++) {
        const x = canvas.width / 2
        const y = canvas.height / 2
        const distFromCenter = i

        particles.push(
            new Particle(
                x,
                y,
                5,
                `hsl(${hueIncrement * i}, 50%, 50%)`,
                distFromCenter
            )
        )
    }
}

// Animation Loop
let angle = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.05)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
        particle.update(mouseAngle)
    })

    angle += 0.01
}

init()
animate()