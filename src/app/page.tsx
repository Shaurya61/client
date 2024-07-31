// 'use client'

// import { logout } from "@/redux/slices/authSlices";
// import { redirect, useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import Cookies from 'js-cookie';
// import AuthForm from "@/components/AuthForm";

// export default function Home() {
//   // const dispatch = useDispatch();
//   // const router = useRouter();
//   // // if(Cookie.get('token') === undefined) {
//   // //   router.push('/auth/login');
//   // // }

//   // const handleLogout = async () => {
//   //   // Call the backend logout route (optional)
//   //   await fetch('/api/auth/logout', {
//   //     method: 'POST',
//   //   });

//   //   // Clear the token from localStorage
//   //   localStorage.removeItem('token');
//   //   Cookies.remove('token');
    
//   //   // Dispatch the logout action if you are using Redux
//   //   dispatch(logout());

//   //   // Redirect to login page
//   //   router.push('/auth/login');
//   // }

//   // return (
//   //   <div>
//   //     <button onClick={handleLogout}>Logout</button>
//   //   </div>
//   // );
//   return <AuthForm mode="login" />;
// }
'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push('/home');
    }
  }, [router]);

  return <AuthForm />;
}
