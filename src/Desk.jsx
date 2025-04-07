import Checker from "./Checker"
import Field from "./Field"

export default function Desk({ model }) {

    return <>
        <group position-y={-.94}>
        {
            Object.keys(model.matrix).map((row, rowIndex) => {
                return Object.keys(model.matrix[row]).map((col, colIndex) => {
                    return <Field properties={model.matrix[row][col]} model={model} key={colIndex} />
                })
            })
        }

        </group>
        <group position-y={-.8}>
            {
                Object.keys(model.matrix).map((row, rowIndex) => {
                    return Object.keys(model.matrix[row]).map((col, colIndex) => {
                        let field = model.matrix[row][col];

                        if (field.checker) {
                            return <Checker properties={model.matrix[row][col].checker} key={colIndex}/>
                        }
                    })
                })
            }
        </group>
    </>
}
