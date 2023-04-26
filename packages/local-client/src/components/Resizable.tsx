import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";
import { useResizable } from "../hooks";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: JSX.Element | JSX.Element[];
}

export const Resizable = ({ direction, children }: ResizableProps) => {
  let resizableProp: ResizableBoxProps;
  const { innerHeight, innerWidth, width, setWidth } = useResizable();

  if (direction === "horizontal") {
    resizableProp = {
      className: "resize-horizontal",
      height: Infinity,
      maxConstraints: [innerWidth * 0.8, Infinity],
      minConstraints: [innerWidth * 0.3, Infinity],
      resizeHandles: ["e"],
      width,
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProp = {
      height: 300,
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 85],
      resizeHandles: ["s"],
      width: Infinity,
    };
  }

  return <ResizableBox {...resizableProp}>{children}</ResizableBox>;
};
