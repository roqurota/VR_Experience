import { Physics, RigidBody } from "@react-three/rapier";
import { Environment, OrbitControls, shaderMaterial, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from 'three';
import { XROrigin, useXR } from "@react-three/xr";
import Checker from "./Checker";
import Field from "./Field";
import { extend, useFrame } from "@react-three/fiber";
import Water from "./shaders/Water";
import Desk from "./Desk";
import Screen from "./Screen";
import UserMovement from "./UserMovement";
import { useUsersStore } from "./Store";

export default function Checkers() {
    const camera = useRef();
    const directionalLight = useRef();
    const seaPlane = useRef();

    const { users } = useUsersStore();

    console.log(users)

    const texture = useTexture({
        map: '/marble_col.jpg',
        normalMap: '/marbel_nor.jpg',
        roughnessMap: '/marbel_rough.jpg'
    })

    const model = {
        checkers: [
            // {
            //     position: new THREE.Vector3(4, .5, 4),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(4, .5, 1.7),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(4, .5, -.6),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(4, .5, -3),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(2.5, .5, 2.8),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(2.5, .5, .4),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(2.5, .5, -1.9),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(2.5, .5, -4),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(1, .5, 4),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(1, .5, 1.7),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(1, .5, -.6),
            //     color: 'black'
            // },
            // {
            //     position: new THREE.Vector3(1, .5, -3),
            //     color: 'black'
            // },
        ],
        matrix: {}
    }

    let currentIndex = 1;

    for (let i = 0; i < 8; i++) {
        model.matrix[i] = {};
        for (let j = 0; j < 8; j++) {
            model.matrix[i][j] = {};

            let field = model.matrix[i][j];
            let size = 1;

            field.x = size * i - 3.5;
            field.z = size * j - 3.5;
            field.size = size;
            field.type = (j + i) % 2 === 0 ? 'black' : 'white';
            field.row = i;
            field.col = j;
            field.index = currentIndex;

            if (field.type === 'black')
                currentIndex++;

            if ((i <= 2 || i >= 5) && (j + i) % 2 === 0) {
                field.checker = {
                    x: field.x,
                    z: field.z,
                    initialX: field.x,
                    initialZ: field.z,
                    size: field.size - 0.1,
                    row: i,
                    col: j
                };

                if (i <= 2)
                    field.checker.type = 'black';
                else if (i >= 5)
                    field.checker.type = 'white';
            }
        }
    }

    // console.log(model)

    // const whiteCheckers = model.fields.filter(el => el.type === 'white');
    // const blackCheckers = model.fields.reverse().filter(el => el.type === 'white');

    // for (let i = 0; i < 12; i++) {
    //     let checker = {};
    //     let field = blackCheckers[i];

    //     checker.x = field.x;
    //     checker.z = field.z;
    //     checker.size = field.size - .1;
    //     checker.color = 'gray';

    //     model.checkers.push(checker);
    // }

    // for (let i = 0; i < 12; i++) {
    //     let checker = {};
    //     let field = whiteCheckers[i];

    //     checker.x = field.x;
    //     checker.z = field.z;
    //     checker.size = field.size - .1;
    //     checker.color = 'brown';

    //     model.checkers.push(checker);
    // }

    const SeaMaterial = shaderMaterial(
        { 
            uTime: { value: 0 },
            color: new THREE.Color(0.2, 0.0, 0.1),
            uBigWavesElevation: 0.1,
            uBigWaveFrequencyX: 1,
            uBigWaveFrequencyY: .5,
            uBigWaveSpeed: 0.75,
            uDepthColor: new THREE.Color('#186691'),
            uSurfaceColor: new THREE.Color('#9bd8ff'),
            uColorOffset: 0.08,
            uColorMultiplier: 5,
        },
        // vertex shader
        /*glsl*/`
          uniform float uTime;
          uniform float uBigWavesElevation;
          uniform float uBigWaveSpeed;
          uniform float uBigWaveFrequencyX;
          uniform float uBigWaveFrequencyY;

          varying vec2 vUv;
          varying float vElevation;

          // Classic Perlin 3D Noise 
          // by Stefan Gustavson
          //
          vec4 permute(vec4 x)
          {
              return mod(((x*34.0)+1.0)*x, 289.0);
          }
          vec4 taylorInvSqrt(vec4 r)
          {
              return 1.79284291400159 - 0.85373472095314 * r;
          }
          vec3 fade(vec3 t)
          {
              return t*t*t*(t*(t*6.0-15.0)+10.0);
          }
  
          float cnoise(vec3 P)
          {
              vec3 Pi0 = floor(P); // Integer part for indexing
              vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
              Pi0 = mod(Pi0, 289.0);
              Pi1 = mod(Pi1, 289.0);
              vec3 Pf0 = fract(P); // Fractional part for interpolation
              vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
              vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
              vec4 iy = vec4(Pi0.yy, Pi1.yy);
              vec4 iz0 = Pi0.zzzz;
              vec4 iz1 = Pi1.zzzz;
  
              vec4 ixy = permute(permute(ix) + iy);
              vec4 ixy0 = permute(ixy + iz0);
              vec4 ixy1 = permute(ixy + iz1);
  
              vec4 gx0 = ixy0 / 7.0;
              vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
              gx0 = fract(gx0);
              vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
              vec4 sz0 = step(gz0, vec4(0.0));
              gx0 -= sz0 * (step(0.0, gx0) - 0.5);
              gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  
              vec4 gx1 = ixy1 / 7.0;
              vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
              gx1 = fract(gx1);
              vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
              vec4 sz1 = step(gz1, vec4(0.0));
              gx1 -= sz1 * (step(0.0, gx1) - 0.5);
              gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  
              vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
              vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
              vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
              vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
              vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
              vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
              vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
              vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  
              vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
              g000 *= norm0.x;
              g010 *= norm0.y;
              g100 *= norm0.z;
              g110 *= norm0.w;
              vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
              g001 *= norm1.x;
              g011 *= norm1.y;
              g101 *= norm1.z;
              g111 *= norm1.w;
  
              float n000 = dot(g000, Pf0);
              float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
              float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
              float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
              float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
              float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
              float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
              float n111 = dot(g111, Pf1);
  
              vec3 fade_xyz = fade(Pf0);
              vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
              vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
              float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
              return 2.2 * n_xyz;
          }

          void main() {
            vUv = uv;
        
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            // Elevation
            float elevation = sin(modelPosition.x * uBigWaveFrequencyX + uTime * uBigWaveSpeed) * 
                              sin(modelPosition.z * uBigWaveFrequencyY + uTime * uBigWaveSpeed) * 
                              uBigWavesElevation;

            for (float i = 1.0; i <= 3.0; i++) {
                elevation -= abs(cnoise(vec3(modelPosition.xz * 3.0 * i, uTime * 0.2)) * 0.15 / i);
            }


            modelPosition.y += elevation;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;

            gl_Position = projectedPosition;

            // Varyings
            vElevation = elevation;
          }
        `,
        // fragment shader
        /*glsl*/`
          
          uniform vec3 uDepthColor;
          uniform vec3 uSurfaceColor;
          uniform float uColorOffset;
          uniform float uColorMultiplier;

          varying vec2 vUv;
          varying float vElevation;
          
          void main() {

            float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
            vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

            gl_FragColor.rgba = vec4(color, 0.5);

            #include <colorspace_fragment>
          }
        `
    )

    extend({ SeaMaterial })

    useFrame((data) => {
        const elapsedTime = data.clock.getElapsedTime();

        // seaPlane.current.material.uniforms.uTime.value = elapsedTime;
    })

    return <>
        <OrbitControls ref={camera} makeDefault />

        <directionalLight castShadow ref={directionalLight} position={[2, 3, 3]} intensity={ 2 } />
        <ambientLight intensity={5} />

        <XROrigin position={[5, 2, 0]}/>

        <Environment
            path="/"
            files={['cube_left.png', 'cube_right.png', 'cube_up.png', 'cube_down.png', 'cube_front.png', 'cube_back.png']} 
            background={true}
        />

        <Screen />

        {
            Object.keys(users).map((user, index) => {
                return <mesh key={users[user].id} position={[index, 1, 5]}>
                    <boxGeometry args={[.8, 1, 1]} />
                    <meshBasicMaterial color={users[user].color} />
                </mesh>
            })
        }

        <UserMovement position={new THREE.Vector3(5, 3, 0)} />

        <Physics gravity={[0, -2, 0]}>
            <RigidBody type="fixed">
                <mesh>
                    <boxGeometry args={[9, .1, 9]} />
                    <meshStandardMaterial {...texture} color="white" />
                </mesh>
            </RigidBody>

            {/* <Water /> */}

            <Desk model={model} />
            
            {/* <group position-y={1}>
                {
                    model.checkers.map((el, index) => {
                        return <Checker properties={el} key={index} />
                    })
                }
            </group> */}
        </Physics>
    </>
}
