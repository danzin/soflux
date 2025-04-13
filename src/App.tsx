import { Routes, Route } from 'react-router-dom'

import './globals.css'
import SignInForm from './_auth/forms/SignInForm'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages'
import SignUpForm from './_auth/forms/SignUpForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"
import PrivateRoute from './_root/PrivateRoute';

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* Main App Routes */}
        <Route element={<RootLayout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/posts/:id" element={<PostDetails />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App