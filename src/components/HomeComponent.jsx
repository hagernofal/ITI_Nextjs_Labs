import { signIn , useSession} from 'next-auth/react';
import React from 'react';

const HomeComponent = () => {
    const {data:session} = useSession()
    if(!session){
    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center p-4" style={{ background: 'linear-gradient(135deg, #eef7ff 0%, #ffffff 100%)' }}>
            <div className="text-center p-5 rounded-4 shadow-sm" style={{ background: 'rgba(255, 255, 255, 0.92)', maxWidth: '420px', width: '100%' }}>
                <h1 className="mb-4 fw-bold" style={{ color: '#1f2937' }}>Welcome</h1>
                <p className="text-muted mb-4">Please sign in to continue to The Store.</p>
                <button className="btn btn-dark px-4 py-2 rounded-pill" onClick={signIn}>sign in</button>
            </div>
        </div>
    );
}
};

export default HomeComponent;