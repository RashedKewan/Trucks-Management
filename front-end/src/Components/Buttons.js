import React from 'react';
import { Link } from 'react-router-dom';

export default function Buttons() {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
        <Link to="/login" className="btn btn-primary" style={{ margin: '10px' }}>
          Login
        </Link>
      </div>
    </div>
  );
}

