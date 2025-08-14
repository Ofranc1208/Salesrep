import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md p-4 mt-auto">
      <div className="flex justify-around">
        <div>Leads Uploaded: 0</div>
        <div>Assigned: 0</div>
        <div>Queued: 0</div>
        <div>Sent: 0</div>
        <div>Errors: 0</div>
      </div>
    </footer>
  );
};

export default Footer;
