import React from 'react'

const Footer = () => {
  return (
    <nav className='grid sm:grid-cols-3 gap-5 mx-10 py-10 justify-self-center'>
      <div><span className='font-medium text-xl pb-1'>Our Services</span>
        <ul>
          <li><a href='/#'>Web Hosting</a></li>
          <li><a href='/#'>Domains</a></li>
          <li><a href='/#'>SSL Certificates</a></li>
          <li><a href='/#'>Cloud Hosting</a></li>
        </ul>
      </div>
      <div><span className='font-medium text-xl pb-1'>Company Info</span>
        <ul>
          <li><a href='/#'>About</a></li>
          <li><a href='/#'>Blog</a></li>
          <li><a href='/#'>Legal Information</a></li>
          <li><a href='/#'>Privacy Policy</a></li>
        </ul>
      </div>
      <div><span className='font-medium text-xl pb-1'>Support</span>
        <ul>
          <li><a href='/#'>Help Center</a></li>
          <li><a href='/#'>FAQ</a></li>
          <li><a href='3'>Contact</a></li>
          <li><a href='/#'>Report Abuse</a></li>
          <li><a href='/#'>Service Status</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Footer