// frontend/src/components/Auth/SignupForm.tsx
import React, { useState } from 'react';
import { SignupData, UserPreferences } from '../../types/user';

interface SignupFormProps {
  onSubmit: (data: SignupData) => void;
  isLoading: boolean;
  error: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<UserPreferences['level']>('beginner');
  const [languages, setLanguages] = useState('');
  const [aiExperience, setAiExperience] = useState<UserPreferences['aiExperience']>('none');
  const [hardwareKnowledge, setHardwareKnowledge] = useState<UserPreferences['hardwareKnowledge']>('basic');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preferences: UserPreferences = {
      level,
      languages: languages.split(',').map(lang => lang.trim()).filter(lang => lang),
      aiExperience,
      hardwareKnowledge,
    };
    onSubmit({ email, password, name, preferences });
  };

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: '20px'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid var(--ifm-global-border-color)',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: 'var(--ifm-font-color-base)',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    color: 'var(--ifm-font-color-base)',
    fontSize: '14px',
    fontWeight: '600'
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23333\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px'
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
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#FFF5F5',
          border: '1px solid #FC8181',
          borderRadius: '12px',
          color: '#C53030',
          marginBottom: '20px',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '18px' }}>⚠️</span>
          <span style={{ flex: 1 }}>{error}</span>
        </div>
      )}

      {/* Name */}
      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="name">
          <span style={{ marginRight: '6px' }}>👤</span>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderColor: focusedField === 'name'
              ? 'var(--ifm-color-primary)'
              : 'var(--ifm-global-border-color)',
            boxShadow: focusedField === 'name'
              ? '0 0 0 3px rgba(100, 200, 200, 0.2)'
              : 'none'
          }}
          placeholder="John Doe"
          required
        />
      </div>

      {/* Email */}
      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="email">
          <span style={{ marginRight: '6px' }}>📧</span>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderColor: focusedField === 'email'
              ? 'var(--ifm-color-primary)'
              : 'var(--ifm-global-border-color)',
            boxShadow: focusedField === 'email'
              ? '0 0 0 3px rgba(100, 200, 200, 0.2)'
              : 'none'
          }}
          placeholder="john@example.com"
          required
        />
      </div>

      {/* Password */}
      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="password">
          <span style={{ marginRight: '6px' }}>🔒</span>
          Password (min. 8 characters)
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...inputStyle,
              paddingRight: '48px',
              borderColor: focusedField === 'password'
                ? 'var(--ifm-color-primary)'
                : 'var(--ifm-global-border-color)',
              boxShadow: focusedField === 'password'
                ? '0 0 0 3px rgba(100, 200, 200, 0.2)'
                : 'none'
            }}
            placeholder="Enter password"
            required
            minLength={8}
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
      </div>

      {/* Section Header */}
      <div style={{
        marginTop: '32px',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '2px solid var(--ifm-global-border-color)'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: 'var(--ifm-font-color-base)',
          margin: 0
        }}>
          📚 Personalization Preferences
        </h3>
        <p style={{
          fontSize: '13px',
          color: 'var(--ifm-font-color-secondary)',
          margin: '6px 0 0 0'
        }}>
          Help us customize your learning experience
        </p>
      </div>

      {/* Programming Level */}
      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="level">
          <span style={{ marginRight: '6px' }}>💻</span>
          Programming Experience Level
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value as UserPreferences['level'])}
          onFocus={() => setFocusedField('level')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...selectStyle,
            borderColor: focusedField === 'level'
              ? 'var(--ifm-color-primary)'
              : 'var(--ifm-global-border-color)',
            boxShadow: focusedField === 'level'
              ? '0 0 0 3px rgba(100, 200, 200, 0.2)'
              : 'none'
          }}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Programming Languages */}
      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="languages">
          <span style={{ marginRight: '6px' }}>🌐</span>
          Programming Languages (comma-separated)
        </label>
        <input
          type="text"
          id="languages"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          onFocus={() => setFocusedField('languages')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...inputStyle,
            borderColor: focusedField === 'languages'
              ? 'var(--ifm-color-primary)'
              : 'var(--ifm-global-border-color)',
            boxShadow: focusedField === 'languages'
              ? '0 0 0 3px rgba(100, 200, 200, 0.2)'
              : 'none'
          }}
          placeholder="e.g., Python, JavaScript, C++"
        />
      </div>

      {/* AI/ML Experience */}
      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="aiExperience">
          <span style={{ marginRight: '6px' }}>🤖</span>
          AI/ML Experience
        </label>
        <select
          id="aiExperience"
          value={aiExperience}
          onChange={(e) => setAiExperience(e.target.value as UserPreferences['aiExperience'])}
          onFocus={() => setFocusedField('aiExperience')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...selectStyle,
            borderColor: focusedField === 'aiExperience'
              ? 'var(--ifm-color-primary)'
              : 'var(--ifm-global-border-color)',
            boxShadow: focusedField === 'aiExperience'
              ? '0 0 0 3px rgba(100, 200, 200, 0.2)'
              : 'none'
          }}
        >
          <option value="none">None</option>
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Hardware Knowledge */}
      <div style={inputContainerStyle}>
        <label style={labelStyle} htmlFor="hardwareKnowledge">
          <span style={{ marginRight: '6px' }}>⚙️</span>
          Hardware Knowledge
        </label>
        <select
          id="hardwareKnowledge"
          value={hardwareKnowledge}
          onChange={(e) => setHardwareKnowledge(e.target.value as UserPreferences['hardwareKnowledge'])}
          onFocus={() => setFocusedField('hardwareKnowledge')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...selectStyle,
            borderColor: focusedField === 'hardwareKnowledge'
              ? 'var(--ifm-color-primary)'
              : 'var(--ifm-global-border-color)',
            boxShadow: focusedField === 'hardwareKnowledge'
              ? '0 0 0 3px rgba(100, 200, 200, 0.2)'
              : 'none'
          }}
        >
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '16px',
          marginTop: '24px',
          background: isLoading
            ? 'var(--ifm-color-secondary)'
            : 'linear-gradient(135deg, var(--ifm-color-primary), var(--ifm-color-primary-dark))',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          fontSize: '1rem',
          fontWeight: '600',
          letterSpacing: '0.5px',
          boxShadow: 'var(--ifm-global-shadow)',
          transition: 'all 0.3s ease',
          cursor: isLoading ? 'not-allowed' : 'pointer',
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
            Creating Account...
          </span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            Create Account
          </span>
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
};

export default SignupForm;
