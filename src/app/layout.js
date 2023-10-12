import AuthProvider from './components/AuthProvider/page'
import Navbar from './components/Navbar/page'
import Toast from './components/Toast/page'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins(
  {
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
  })

export const metadata = {
  title: 'Taskify',
  description: 'Developed by ~ Zain-ul-Abdin',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Toast />
          <Navbar />
          <div className='w-full px-[20px] md:px-[50px] py-4 md:py-8 mt-[70px]'>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
