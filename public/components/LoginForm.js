// import React, { useRef } from 'react';
// import { useGlobalContext } from '../context';

// const LoginForm = ({ className, callback, children, ...props }) => {
//   const formRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(formRef.current);
//     login(formData);
//   };

//   return (
//     <form
//       ref={formRef}
//       className={`form__body ${className}`}
//       onSubmit={handleSubmit}
//     >
//       {children}
//     </form>
//   );
// };

// export default LoginForm;
