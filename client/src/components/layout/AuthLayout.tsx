import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <div>
        <div>
          <div>
            <h1>Welcome Back</h1>
            <p>Sign in to continue to the Claims Management System.</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
