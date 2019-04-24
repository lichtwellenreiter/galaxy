import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
canvas.style.backgroundColor = '#0D1218'

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
const PLANET_COLOR = '#ecf0f1'


// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
function Planet(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Object.prototype.update = function() {
    this.draw()
}

// Implementation
let planets
let asteroids
function init() {
    planets = []
    asteroids = []

    for (let i = 0; i < 500; i++) {

        var x = Math.floor(Math.random() * Math.floor(window.innerWidth))
        var y = Math.floor(Math.random() * Math.floor(window.innerHeight))
        var radius = Math.floor(Math.random() * Math.floor(3))
        var velocity = Math.floor(Math.random() * Math.floor(10))

        planets.push(new Planet(x, y, radius, PLANET_COLOR, radius*0.2))
        

    }

    for(let j = 0; j < 1; j++){
        var x = Math.floor(Math.random() * Math.floor(window.innerWidth))
        var y = Math.floor(Math.random() * Math.floor(window.innerHeight))
        asteroids.push(new Planet(x, y, 3, '#F9E79F', 5))
        
    }
}

// Animation Loop
let asteroid_timeout = 255
let curAsteroidTimeout = 0
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    planets.forEach(planet => {
        if( (planet.y + planet.radius) <= 0 ){
            planet.y = window.innerHeight
        } else if ((planet.x + planet.radius) <= 0) {
            planet.x = window.innerWidth
        } else {
            planet.y -= planet.velocity
            planet.x -= planet.velocity
        }
        planet.update()
    })

    asteroids.forEach(asteroid => {

        if( (asteroid.y + asteroid.radius) <= 0  || (asteroid.x + asteroid.radius) <= 0){


            if( asteroid_timeout != curAsteroidTimeout ){
                curAsteroidTimeout ++
                console.log("curTimeout:" + curAsteroidTimeout + " | Gap: " + (asteroid_timeout - curAsteroidTimeout))
            } else {

                if( (asteroid.y + asteroid.radius) <= 0 ){
                    asteroid.y = window.innerHeight + Math.floor(Math.random() * Math.floor(1200))
                }

                if((asteroid.x + asteroid.radius) <= 0){
                    asteroid.x = window.innerWidth + Math.floor(Math.random() * Math.floor(1200))
                }

                curAsteroidTimeout = 0
                asteroid_timeout = Math.floor(Math.random() * Math.floor(765))
                asteroid.radius = Math.floor(Math.random() * Math.floor(3))
                console.log("Asteroid X:" + asteroid.x + " Y:" + asteroid.y + " | New Timeout: " + asteroid_timeout + " | New Radius: " + asteroid.radius)
            }

        } else {
            asteroid.y -= asteroid.velocity
            asteroid.x -= asteroid .velocity
        }

        asteroid.update()

    })
}

init()
animate()
