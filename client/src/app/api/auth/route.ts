export async function POST(request: Request) {
    const body = await request.json()
    const accessToken = body.accessToken as string
    const refreshToken = body.refreshToken as string
    if (!refreshToken || !accessToken) {
        return Response.json(
            { message: 'Refresh token or access token does not exist' },
            {
                status: 400
            }
        )
    }

    const expiresATDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString(); 
    const expiresRTDate = new Date(Date.now() + 1000 * 60 * 24 * 60 * 60).toUTCString(); 

    const headers = new Headers();
    headers.append('Set-Cookie', `accessToken=${accessToken}; Path=/; HttpOnly; Expires=${expiresATDate}; SameSite=Lax; Secure`);
    headers.append('Set-Cookie', `refreshToken=${refreshToken}; Path=/; HttpOnly; Expires=${expiresRTDate}; SameSite=Lax; Secure`);

    return Response.json(body, {
        status: 200,
        headers: headers
    })
}
