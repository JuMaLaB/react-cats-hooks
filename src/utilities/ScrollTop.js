import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "../css/ScrollTop.css";

export default function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}