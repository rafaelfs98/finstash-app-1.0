import { Outlet, useOutletContext } from "react-router-dom";

/**
 * @description this is a bridge, to connect the parent outlet with his child
 * @returns Outlet
 */
const OutletBridge = () => {
  const outletContext = useOutletContext();

  return <Outlet context={outletContext} />;
};

export default OutletBridge;
