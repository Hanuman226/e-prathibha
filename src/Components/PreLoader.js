import React from "react";
import { Spinner } from "react-bootstrap";
export default function PreLoader() {
  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="dark" />
    </div>
  );
}
