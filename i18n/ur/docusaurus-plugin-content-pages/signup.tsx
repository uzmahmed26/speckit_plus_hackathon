// frontend/src/pages/signup.tsx
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import SignupForm from '@site/src/components/Auth/SignupForm';
import { authService } from '@site/src/services/authService';
import { SignupData } from '../types/user';

const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signup(data);
      // Use window.location for navigation (compatible with all Docusaurus versions)
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during signup.');
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="Sign Up"
      description="Sign up for an account to personalize your Docusaurus experience."
    >
      <main style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #A8E0DC, #83C0C1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'var(--ifm-global-shadow)',
        padding: '40px 20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #83C0C1, #A8E0DC)',
              borderRadius: '24px',
              boxShadow: 'var(--ifm-global-shadow)',
            }}>
              🤖
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'var(--ifm-font-color-base)',
              marginBottom: '8px'
            }}>
              Create Account
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'var(--ifm-font-color-secondary)',
              margin: 0
            }}>
              Join us to personalize your learning experience
            </p>
          </div>

          {/* Form Card */}
          <div style={{
            backgroundColor: 'linear-gradient(135deg, #83C0C1, #A8E0DC)',
            borderRadius: '24px',
            padding: 'var(--ifm-gap-lg)',
            boxShadow: 'var(--ifm-global-shadow)',
            border: '2px solid var(--ifm-global-border-color)'
          }}>
            <SignupForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '24px'
          }}>
            <p style={{
              color: 'var(--ifm-font-color-secondary)',
              fontSize: '14px'
            }}>
              Already have an account?{' '}
              <a
                href="/login"
                style={{
                  color: 'var(--ifm-color-primary)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ifm-color-primary-dark)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ifm-color-primary)'}
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SignupPage;