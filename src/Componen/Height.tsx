import React from "react";

type itHeight = {
    height: number
}
const Height: React.FC<itHeight> = ({ height }) => {
    return (<div style={{ height: height }}></div>);
}

export default Height;