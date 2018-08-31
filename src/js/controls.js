const THREE = require('three')

let forward = false
let backward = false
let strafeLeft = false
let strafeRight = false

let forwardSpeed = 0
let strafeSpeed = 0

module.exports = {
    bind: (camera) => {
        const PI_2 = Math.PI / 2

        camera.rotation.set(0,0,0)
        
        document.addEventListener('keydown', keyDownHandler, false)
        document.addEventListener('keyup', keyUpHandler, false)

        function keyDownHandler(event) {
            if (event.keyCode == 87) forward = true
            else if (event.keyCode == 83) backward = true
            if (event.keyCode == 65) strafeLeft = true
            else if (event.keyCode == 68) strafeRight = true 
        }

        function keyUpHandler(event) {
            if (event.keyCode == 87) forward = false
            else if (event.keyCode == 83) backward = false
            if (event.keyCode == 65) strafeLeft = false
            else if (event.keyCode == 68) strafeRight = false 
            if (event.keyCode == 27) pointerLockHandler()
        }

        function pointerLockHandler() {
            if (document.pointerLockElement) {
                document.exitPointerLock()
                document.removeEventListener('mousemove', mouseMoveHandler, false)
            } else {
                document.body.requestPointerLock()
                document.addEventListener('mousemove', mouseMoveHandler, false)
            }
        }

        function getDirection() {
            let direction = new THREE.Vector3(0,0,-1)
            let rotation = new THREE.Euler(0,0,0, 'YXZ')

            return function(v) {
                rotation.set(camera.rotation.x, camera.rotation.y, 0)
                v.copy(direction).applyEuler(rotation)
                return v
            }
        }

        function mouseMoveHandler(event) {
            let dx = event.movementX
            let dy = event.movementY

            camera.rotation.y -= dx * 0.002
            camera.rotation.x -= dy * 0.002

            camera.rotation.x = Math.max(-PI_2, Math.min(PI_2, camera.rotation.x))
            //camera.lookAt(getDirection())
        }
    }
}