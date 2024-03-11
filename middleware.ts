import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.rewrite(req.url);
  },
  {
    callbacks: {
      authorized({ token }) {
        if (!token) {
          return false;
        }

        return true;
      },
    },
  }
);

//USAGE: THIS IS THE PLACE TO ADD ROUTE TO BE PROTECTED
export const config = {
  matcher: [],
};
