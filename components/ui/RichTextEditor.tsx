'use client';

import React, { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = 'Write the maison story here...',
  minHeight = '220px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [rawHtml, setRawHtml] = useState(value || '');

  useEffect(() => {
    if (editorRef.current && !isHtmlMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setRawHtml(value || '');
  }, [value, isHtmlMode]);

  const executeCommand = (command: string, arg?: string) => {
    if (isHtmlMode) return;
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      onChange(updated);
      setRawHtml(updated);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      onChange(updated);
      setRawHtml(updated);
    }
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawHtml(val);
    onChange(val);
  };

  const handleInsertLink = () => {
    const url = prompt('Enter hyperlink URL:', 'https://');
    if (url) executeCommand('createLink', url);
  };

  return (
    <div className="space-y-1.5 text-xs">
      {label && (
        <label className="block uppercase tracking-wider text-neutral-600 font-semibold mb-1">
          {label}
        </label>
      )}

      <div className="border border-sand-300 rounded-sm overflow-hidden bg-white shadow-sm focus-within:border-neutral-900 transition-colors">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-sand-50 border-b border-sand-200 text-neutral-700 select-none">
          <button
            type="button"
            onClick={() => executeCommand('bold')}
            className="p-1.5 hover:bg-sand-200 rounded font-bold transition-colors"
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => executeCommand('italic')}
            className="p-1.5 hover:bg-sand-200 rounded italic transition-colors font-serif"
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => executeCommand('underline')}
            className="p-1.5 hover:bg-sand-200 rounded underline transition-colors"
            title="Underline (Ctrl+U)"
          >
            U
          </button>

          <span className="w-px h-4 bg-sand-300 mx-1" />

          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h3>')}
            className="p-1.5 hover:bg-sand-200 rounded font-serif font-bold text-xs"
            title="Section Heading (H3)"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h4>')}
            className="p-1.5 hover:bg-sand-200 rounded font-serif font-semibold text-xs"
            title="Subsection Heading (H4)"
          >
            H4
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<p>')}
            className="p-1.5 hover:bg-sand-200 rounded text-xs"
            title="Paragraph"
          >
            P
          </button>

          <span className="w-px h-4 bg-sand-300 mx-1" />

          <button
            type="button"
            onClick={() => executeCommand('insertUnorderedList')}
            className="p-1.5 hover:bg-sand-200 rounded text-xs"
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => executeCommand('insertOrderedList')}
            className="p-1.5 hover:bg-sand-200 rounded text-xs"
            title="Numbered List"
          >
            1. List
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<blockquote>')}
            className="p-1.5 hover:bg-sand-200 rounded text-xs italic font-serif"
            title="Blockquote"
          >
            “ Quote
          </button>

          <span className="w-px h-4 bg-sand-300 mx-1" />

          <button
            type="button"
            onClick={handleInsertLink}
            className="p-1.5 hover:bg-sand-200 rounded text-xs"
            title="Insert Link"
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => executeCommand('removeFormat')}
            className="p-1.5 hover:bg-sand-200 rounded text-xs text-neutral-400 hover:text-red-600"
            title="Clear Formatting"
          >
            Clear
          </button>

          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setIsHtmlMode(!isHtmlMode)}
              className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all ${
                isHtmlMode
                  ? 'bg-neutral-900 text-white'
                  : 'bg-sand-200 text-neutral-700 hover:bg-sand-300'
              }`}
              title="Toggle Raw HTML / Visual Mode"
            >
              {isHtmlMode ? 'Visual Mode' : 'HTML Source'}
            </button>
          </div>
        </div>

        {/* Content Canvas */}
        {isHtmlMode ? (
          <textarea
            value={rawHtml}
            onChange={handleHtmlChange}
            style={{ minHeight }}
            className="w-full p-4 font-mono text-xs bg-sand-900 text-sand-100 outline-none resize-y"
            placeholder="<p>Enter HTML markup...</p>"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            style={{ minHeight }}
            data-placeholder={placeholder}
            className="p-4 outline-none prose max-w-none text-neutral-900 leading-relaxed text-sm focus:outline-none overflow-y-auto"
          />
        )}
      </div>
    </div>
  );
}
