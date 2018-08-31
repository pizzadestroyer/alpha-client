const THREE = require('three')
const path = require('path')

const socket = require(path.join(__dirname, '../js/networkmanager'))
const controls = require('../js/controls')

let gameObjects = []

let camera, scene, renderer

socket.on('gameObjects', (data) => {
    gameObjects = JSON.parse(data)
})

socket.on('player disconnected', (data) => {
    scene.removeObjectByName(data)
})

const init = () => {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000)
    controls.bind(camera)

    scene = new THREE.Scene()

    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    let geometry = new THREE.PlaneGeometry( 500, 500, 500 )
    let material = new THREE.MeshBasicMaterial({color: 0x424200})
    let plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, 0, -1000)
    scene.add( plane );

    document.body.appendChild(renderer.domElement)
}

const update = () => {
    gameObjects.forEach((gameObject) => {
        if (gameObject.id == socket.id) {                
            //if (forward) {
            //    forwardSpeed += 5
            //}

            //if (backward) {
            //    forwardSpeed -= 5
            //}

            //if (strafeLeft) {
            //    strafeSpeed -= 5
            //}

            //if (strafeRight) {
            //    strafeSpeed += 5
            //}

            //camera.position.set(gameObject.position.x, gameObject.position.y, gameObject.position.z)
            //camera.rotation.set(gameObject.rotation.x, gameObject.rotation.y, gameObject.rotation.z)

            //if (forwardSpeed != 0) {
                //let direction = new THREE.Vector3()
                //camera.getWorldDirection(direction)
                //direction.multiplyScalar(forwardSpeed)
                //let nextPosition = new THREE.Vector3(gameObject.position.x, gameObject.position.y, gameObject.position.z).add(direction)
                //gameObject.position.x = nextPosition.x
                //gameObject.position.y = nextPosition.y
                //gameObject.position.z = nextPosition.z
                
                //socket.emit('player moved', JSON.stringify(gameObject))
                //forwardSpeed = 0
            //}
            
            //if (strafeSpeed != 0) {
                //let strafeDirection = new THREE.Vector3()
                //let direction = new THREE.Vector3()
                //camera.getWorldDirection(direction)
                //strafeDirection.crossVectors(direction, new THREE.Vector3(0, 1, 0))
                //strafeDirection.multiplyScalar(strafeSpeed)
                //let nextPosition = new THREE.Vector3(gameObject.position.x, gameObject.position.y, gameObject.position.z).add(strafeDirection)  
                //gameObject.position.x = nextPosition.x
                //gameObject.position.y = nextPosition.y
                //gameObject.position.z = nextPosition.z
                
                //socket.emit('player moved', JSON.stringify(gameObject))
                //strafeSpeed = 0
            //}
        }
        //controls.update(1)
    })

    gameObjects.forEach((gameObject) => {
        if (scene.getObjectByName(gameObject.id)) {
            scene.getObjectByName(gameObject.id).position.set(gameObject.position.x, gameObject.position.y, gameObject.position.z)   
        } else {
            let geometry = new THREE.BoxBufferGeometry(200, 200, 200)
            let material = new THREE.MeshBasicMaterial({wireframe: true})

            let mesh = new THREE.Mesh(geometry, material)
            mesh.name = gameObject.id
            mesh.position = gameObject.position 
            scene.add(mesh)
        }
    })
}

const animate = () => {
    requestAnimationFrame(animate)
    update()
    renderer.render(scene, camera)
}

init()
animate()

