import React, { useState } from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useHistory, useLocation } from '@docusaurus/router';
import PersonalizeButton from '../../../components/PersonalizeButton';
import { getPersonalizedContent } from '../../../services/geminiService';
import { authService } from '../../../services/authService';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  const { metadata } = useDoc();
  const history = useHistory();
  const location = useLocation();
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [personalizeError, setPersonalizeError] = useState<string | null>(null);

  const user = authService.getUser();
  const isUrdu = location.pathname.startsWith('/ur/');

  const handlePersonalize = async () => {
    if (!user) {
      alert('Please login to personalize content');
      history.push('/login');
      return;
    }

    setIsPersonalizing(true);
    setPersonalizeError(null);

    try {
      const content = document.querySelector('.theme-doc-markdown')?.textContent || '';
      const personalizedContent = await getPersonalizedContent(
        content,
        user.preferences,
        metadata.title || 'Page'
      );

      // Show personalized content in a modal or alert
      const shouldApply = confirm(
        'Content personalized! Click OK to view the personalized version.\n\n' +
        'Note: This is a preview. Refresh the page to return to original content.'
      );

      if (shouldApply && personalizedContent) {
        const markdownContainer = document.querySelector('.theme-doc-markdown');
        if (markdownContainer) {
          const previewDiv = document.createElement('div');
          previewDiv.style.cssText = `
            background: #E3F2FD;
            border: 2px solid #007BFF;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          `;
          previewDiv.innerHTML = `
            <h3 style="color: #007BFF; margin-top: 0;">
              🎯 Personalized Content for ${user.preferences.level} Level
            </h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">
              ${personalizedContent.replace(/\n/g, '<br>')}
            </div>
            <button onclick="this.parentElement.remove()"
              style="
                margin-top: 15px;
                padding: 8px 16px;
                background: #007BFF;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
              ">
              ✕ Close Personalized View
            </button>
          `;
          markdownContainer.insertBefore(previewDiv, markdownContainer.firstChild);
        }
      }
    } catch (error) {
      console.error('Personalization error:', error);
      setPersonalizeError('Failed to personalize content. Please try again.');
    } finally {
      setIsPersonalizing(false);
    }
  };

  const handleTranslate = () => {
    // Toggle between English and Urdu
    const newPath = isUrdu
      ? location.pathname.replace('/ur/', '/')
      : `/ur${location.pathname}`;
    history.push(newPath);
  };

  return (
    <>
      {/* Action Buttons at Top of Chapter */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        padding: '16px',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        borderRadius: '12px',
        border: '1px solid #90CAF9',
        flexWrap: 'wrap'
      }}>
        <PersonalizeButton
          onPersonalize={handlePersonalize}
          isLoading={isPersonalizing}
          error={personalizeError}
        />

        <button
          className="button button--secondary"
          onClick={handleTranslate}
          style={{
            flex: 1,
            minWidth: '200px',
            background: isUrdu ? '#28A745' : '#007BFF',
            color: 'white',
            border: 'none',
            fontWeight: '600'
          }}
        >
          {isUrdu ? '🇬🇧 Switch to English' : '🇵🇰 اردو میں پڑھیں'}
        </button>
      </div>

      <Layout {...props} />
    </>
  );
}
