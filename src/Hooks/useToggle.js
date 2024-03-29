import { useState } from "react";

export default function useToggle() {
  const [show, setShow] = useState(false);

  function toggle() {
    setShow(!show);
  }
  return [show, toggle];
}
