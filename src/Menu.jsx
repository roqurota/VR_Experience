import { Html } from "@react-three/drei"
import { XRDomOverlay } from "@react-three/xr"

export default function Menu() {
    return <>
        {/* <Html transform scale={.3}>
            <div className="menu">
                <div className="menu-item">
                    Position A
                </div>
                <div className="menu-item">
                    Position B
                </div>
                <div className="menu-item">
                    Position C
                </div>
            </div>
        </Html> */}
        <XRDomOverlay
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
        <div style={{ backgroundColor: 'red', padding: '1rem 2rem' }}>Hello World</div>
        </XRDomOverlay>
    </>
}
