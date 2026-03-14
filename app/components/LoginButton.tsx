import React from 'react'

import Image from 'next/image'
import lastFmLogo from '../../public/Last-fm_idbnBgNw4l_0.svg';

type Props = {
    authUrl: string
}

const LoginButton = () => {
    return (
        <a href='../api/auth' className="px-5 py-2 rounded-full bg-rose-900 inline-flex items-center gap-2">
            Sign In {' '}
            <Image src={lastFmLogo} alt="Last FM logo" width={20} height={20} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </a>
    );
};

export default LoginButton;