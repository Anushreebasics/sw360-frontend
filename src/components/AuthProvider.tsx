// Copyright (C) 2026. Part of the SW360 Frontend Project.
// AuthProvider: Redirects unauthenticated users to the sign-in page

'use client'
import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Spinner } from 'react-bootstrap'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { status } = useSession()
    const pathname = usePathname()

    useEffect(() => {
        if (status === 'unauthenticated') {
            // Redirect to sign-in page, preserve intended path
            signIn(undefined, { callbackUrl: pathname })
        }
    }, [status, pathname])

    if (status === 'loading') {
        return (
            <div className='col-12 d-flex justify-content-center align-items-center' style={{ minHeight: 200 }}>
                <Spinner className='spinner' />
            </div>
        )
    }

    // Only render children if authenticated
    if (status === 'authenticated') {
        return <>{children}</>
    }
    // Otherwise, nothing (redirect in progress)
    return null
}
