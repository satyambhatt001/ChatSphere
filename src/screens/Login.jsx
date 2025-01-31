

import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { UserContext } from '../context/user.context'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('') 

    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    function submitHandler(e) {
        e.preventDefault()
        setError('') 

        axios.post('/users/login', { email, password })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                setUser(res.data.user)
                navigate('/')
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.message || 'Invalid credentials'
                setError(errorMessage)
                
                
                setTimeout(() => {
                    setError('')
                }, 3000) 
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl">
                <h2 className="text-4xl font-bold text-white mb-8 text-center animate-fade-in">Welcome Back!</h2>
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="animate-slide-in">
                        <label className="block text-gray-400 mb-2 text-sm font-medium" htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-4 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="animate-slide-in delay-100">
                        <label className="block text-gray-400 mb-2 text-sm font-medium" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-4 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 animate-fade-in"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 mt-6 text-center animate-fade-in">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-400 hover:text-blue-500 hover:underline transition-all duration-200"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
