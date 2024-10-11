import { NextRequest,NextResponse } from 'next/server'
export {default} from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const token = await getToken({ req: request })
    const url=request.nextUrl

    if(token && url.pathname==='/api/auth/signin'){
        return NextResponse.redirect(new URL('/details', request.url))
    }
    if(!token){
        if(url.pathname==='/details'){
            return NextResponse.redirect(new URL('/api/auth/signin', request.url))
        }else{
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}
 
// kha kha p middleware call hona chaiye
export const config = {
  matcher: ['/details','/verify/:path*'],
}