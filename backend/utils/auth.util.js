export const generateAccessToken = (userId) => {
    return jwt.sign({id : userId}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
    });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({id:userId}, process.env_JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
    });
};

export const sendRefreshTokenCookie = (res, token) => { 
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure : process.env.NODE_ENV == 'production',
        sameSite : 'strict',
        maxAge : 7 * 24 * 60 * 60 * 1000,
    });
}
