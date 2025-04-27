'use client';

import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-8">
            Team Notes
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            A simple, collaborative space for your team to share ideas and updates.
          </p>

          {session ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <a
                href="/dashboard"
                className="inline-block bg-white text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                View Notes
              </a>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center space-y-4 max-w-sm mx-auto"
            >
              <button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="w-full bg-white text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
              <button
                onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Real-time Updates</h3>
            <p className="text-gray-400">
              See team updates as they happen. Stay in sync with your colleagues.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Simple Sharing</h3>
            <p className="text-gray-400">
              Share ideas, updates, and feedback with your team in one place.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Team Focused</h3>
            <p className="text-gray-400">
              Built for teams to collaborate and stay connected.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 