import React, { useState } from 'react';
import { X, Send, Check, Mail, Code, Eye, Copy } from 'lucide-react';
import { AutomatedEmail } from '../types';

interface EmailPreviewModalProps {
  email: AutomatedEmail | null;
  onClose: () => void;
  onResend?: (email: AutomatedEmail) => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  email,
  onClose,
  onResend
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [copied, setCopied] = useState(false);
  const [resent, setResent] = useState(false);

  if (!email) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(email.htmlBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResend = () => {
    if (onResend) {
      onResend(email);
    }
    setResent(true);
    setTimeout(() => setResent(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-slate-800">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Email Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 truncate max-w-md">
                {email.subject}
              </div>
              <div className="text-[11px] text-slate-500">
                To: <strong className="text-slate-800">{email.recipientName}</strong> ({email.recipientEmail})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visual</span>
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'html' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>HTML</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ribbon */}
        <div className="px-6 py-2.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>Booking Ref: <strong className="text-blue-600 font-mono">{email.bookingRef}</strong></span>
            <span>·</span>
            <span>Sent: <strong>{new Date(email.sentAt).toLocaleString()}</strong></span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">✓ Delivered</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy HTML'}</span>
            </button>
            <button
              onClick={handleResend}
              className="px-3 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {resent ? <Check className="w-3 h-3" /> : <Send className="w-3 h-3" />}
              <span>{resent ? 'Resent' : 'Resend Email'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 flex justify-center">
          {activeTab === 'preview' ? (
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
              <iframe
                title="Automated Email Template Preview"
                srcDoc={email.htmlBody}
                className="w-full min-h-[550px] border-0"
              />
            </div>
          ) : (
            <pre className="w-full max-w-3xl p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap select-all">
              {email.htmlBody}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
