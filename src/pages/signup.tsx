// frontend/src/pages/signup.tsx
import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import SignupForm from '../components/Auth/SignupForm';
import { authService } from '../services/authService';
import { SignupData } from '../types/user';

const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signup(data);
      history.push('/');
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
        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)',
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
              background: 'linear-gradient(135deg, #007BFF 0%, #0069D9 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)'
            }}>
              🤖
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#343A40',
              marginBottom: '8px'
            }}>
              Create Account
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6C757D',
              margin: 0
            }}>
              Join us to personalize your learning experience
            </p>
          </div>

          {/* Form Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(0, 123, 255, 0.15)',
            border: '1px solid #E9ECEF'
          }}>
            <SignupForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '24px'
          }}>
            <p style={{
              color: '#6C757D',
              fontSize: '14px'
            }}>
              Already have an account?{' '}
              <a
                href="/login"
                style={{
                  color: '#007BFF',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0056b3'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#007BFF'}
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