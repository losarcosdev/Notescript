import { useCustomSelector } from "./useCustomSelector";

export const useCumulativeCode = (cellId: string) => {
  const cumulativeCode = useCustomSelector(({ cells: { data, order } }) => {
    const orderedCells = order.map((id) => data[id]);

    const showFn = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value) => {
      const root = document.getElementById('root');

      if(typeof value === 'object'){
        if(value.$$typeof && value.props){
          _ReactDOM.render(value , root )
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      }else {
        root.innerHTML = value;
      };
    };
    `;

    const showFuncNoOp = `var show = () => {}`;
    const cumulativeCode = [];
    for (let cell of orderedCells) {
      if (cell.type === "code") {
        if (cell.id === cellId) {
          cumulativeCode.push(showFn);
        } else {
          cumulativeCode.push(showFuncNoOp);
        }
        cumulativeCode.push(cell.content as string);
      }
      if (cell.id === cellId) break;
    }

    return cumulativeCode.join("\n");
  });

  return {
    cumulativeCode,
  };
};
