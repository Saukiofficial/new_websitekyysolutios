import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function AiMarkdownMessage({ content, isUser = false }) {
    if (isUser) {
        return <div className="whitespace-pre-wrap leading-relaxed font-normal">{content}</div>;
    }

    // Clean up any remaining asterisks just in case
    const cleanContent = typeof content === 'string' ? content : '';

    return (
        <div className="text-slate-800 text-[12px] leading-[1.65] font-normal select-text space-y-2">
            <ReactMarkdown
                components={{
                    p: ({ children }) => (
                        <p className="leading-[1.65] text-slate-800 font-normal m-0">
                            {children}
                        </p>
                    ),
                    strong: ({ children }) => (
                        <span className="font-normal text-slate-800">
                            {children}
                        </span>
                    ),
                    em: ({ children }) => (
                        <span className="text-slate-800 font-normal">
                            {children}
                        </span>
                    ),
                    h1: ({ children }) => (
                        <p className="font-medium text-slate-900 mt-2 mb-1">
                            {children}
                        </p>
                    ),
                    h2: ({ children }) => (
                        <p className="font-medium text-slate-900 mt-2 mb-1">
                            {children}
                        </p>
                    ),
                    h3: ({ children }) => (
                        <p className="font-medium text-slate-900 mt-1.5 mb-1">
                            {children}
                        </p>
                    ),
                    h4: ({ children }) => (
                        <p className="font-medium text-slate-900 mt-1.5 mb-1">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="space-y-1.5 my-1.5 pl-0.5 list-none">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="space-y-1.5 my-1.5 pl-4 list-decimal text-slate-800 font-normal">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="flex items-start space-x-2 text-slate-800 leading-snug font-normal">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 opacity-70" />
                            <span className="flex-1 font-normal">{children}</span>
                        </li>
                    ),
                    code: ({ inline, children }) => (
                        <code className="font-mono text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-normal border border-slate-200">
                            {children}
                        </code>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-slate-300 pl-2.5 py-0.5 my-1 text-slate-600 bg-slate-50 rounded-r">
                            {children}
                        </blockquote>
                    ),
                    a: ({ href, children }) => (
                        <a 
                            href={href} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[#2563EB] font-normal underline inline-flex items-center space-x-0.5"
                        >
                            <span>{children}</span>
                        </a>
                    ),
                }}
            >
                {cleanContent}
            </ReactMarkdown>
        </div>
    );
}
