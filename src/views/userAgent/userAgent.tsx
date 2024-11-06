// "use client";

import { BackToHome } from "@/components/backToHome/backToHome";
// import { useUserAgentContext } from "@/components/providers/userAgentProvider";
import { headers } from 'next/headers'

export const UserAgent = () => {
  // const { userAgent } = useUserAgentContext();

  const headersList = headers()
  const userAgent = headersList.get('user-agent')

  return (
    <div>
      <BackToHome />

      {userAgent && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>

          <div className="border p-2">{userAgent}</div>
        </div>
      )}

      {!userAgent && <div>No user agent</div>}
    </div>
  );
};


export async function generateStaticParams() {
  return { headers: { 'x-user-agent': '' } }; // Prevent SSR error by providing a default
}