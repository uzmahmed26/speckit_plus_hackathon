// frontend/src/pages/login.tsx
import React, { useState } from 'react';
import { LoginData } from '../types/user';
import Layout from '@theme/Layout';
import { authService } from '@site/src/services/authService';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await authService.login(formData);
      // Redirect to home page after successful login
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '24px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 48px 14px 16px',
    border: '2px solid var(--ifm-global-border-color)',
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: 'var(--ifm-font-color-secondary)',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '10px',
    color: '#495057',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.3px'
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform 0.2s ease'
  };

  return (
    <Layout title="Login" description="Login to access your personalized content">
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #A8E0DC, #83C0C1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'var(--ifm-global-shadow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '440px',
          width: '100%',
          padding: '48px 40px',
          background: 'linear-gradient(135deg, #83C0C1, #A8E0DC)',
          borderRadius: '24px',
          boxShadow: 'var(--ifm-global-shadow)',
          padding: 'var(--ifm-gap-lg)',
          border: '2px solid var(--ifm-global-border-color)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '800',
              color: 'var(--ifm-font-color-base)',
              marginBottom: '12px',
              letterSpacing: '-0.5px'
            }}>
              Welcome Back!
            </h1>
            <p style={{
              color: 'var(--ifm-font-color-secondary)',
              fontSize: '15px',
              fontWeight: '400'
            }}>
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: '14px 18px',
                backgroundColor: '#FFF5F5',
                border: '1px solid #FC8181',
                borderRadius: '12px',
                color: '#C53030',
                marginBottom: '24px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'slideIn 0.3s ease'
              }}>
                <span style={{ fontSize: '20px' }}>⚠️</span>
                <span style={{ flex: 1 }}>{error}</span>
              </div>
            )}

            {/* Email */}
            <div style={inputContainerStyle}>
              <label style={labelStyle}>
                <span style={{ marginRight: '6px' }}>📧</span>
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle,
                  borderColor: focusedField === 'email'
                    ? 'var(--ifm-color-warning)'
                    : 'var(--ifm-global-border-color)',
                  boxShadow: focusedField === 'email'
                    ? '0 0 0 3px rgba(247, 220, 136, 0.3)'
                    : 'none'
                }}
                placeholder="john@example.com"
                autoComplete="email"
              />
              {formData.email && (
                <div style={{
                  ...iconStyle,
                  color: 'var(--ifm-color-success)'
                }}>
                  ✓
                </div>
              )}
            </div>

            {/* Password */}
            <div style={inputContainerStyle}>
              <label style={labelStyle}>
                <span style={{ marginRight: '6px' }}>🔒</span>
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle,
                  borderColor: focusedField === 'password'
                    ? 'var(--ifm-color-warning)'
                    : 'var(--ifm-global-border-color)',
                  boxShadow: focusedField === 'password'
                    ? '0 0 0 3px rgba(247, 220, 136, 0.3)'
                    : 'none'
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <div
                style={{
                  ...iconStyle,
                  color: showPassword ? 'var(--ifm-color-primary)' : 'var(--ifm-font-color-secondary)'
                }}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: isLoading
                  ? 'var(--ifm-color-secondary)'
                  : 'linear-gradient(135deg, var(--ifm-color-success), var(--ifm-color-secondary))',
                border: 'none',
                borderRadius: '24px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                boxShadow: 'var(--ifm-global-shadow)',
                transition: 'all 0.3s ease',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--ifm-global-shadow)';
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                  Signing In...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  Sign In
                </span>
              )}
            </button>

            <style>{`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </form>

          <div style={{
            marginTop: '28px',
            textAlign: 'center',
            color: 'var(--ifm-font-color-secondary)',
            fontSize: '14px'
          }}>
            Don't have an account?{' '}
            <a
              href="/signup"
              style={{
                color: '#007BFF',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ifm-color-primary-dark)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ifm-color-primary)'}
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;