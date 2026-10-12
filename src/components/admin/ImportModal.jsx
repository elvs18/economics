import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Upload, CheckCircle2 } from 'lucide-react';

export default function ImportModal({ isOpen, onClose, onImport }) {
  const { t } = useLanguage();
  const [jsonText, setJsonText] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        setJsonText(content);
      } catch {
        setError(t('importError'));
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jsonText.trim()) {
      setError(t('importError'));
      return;
    }

    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('Not an array');
      }
      onImport(parsed);
      onClose();
    } catch (err) {
      setError(t('importError') + ' — ' + (err.message || ''));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container import-modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{t('importTitle')}</h3>
          <button
            type="button"
            className="icon-btn modal-close-btn"
            onClick={onClose}
            aria-label={t('close')}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="import-modal-form">
          <p className="modal-description">{t('importDesc')}</p>

          {error && <div className="form-error-alert">{error}</div>}

          {/* File Upload Box */}
          <div className="file-drop-area">
            <Upload size={24} className="upload-icon" />
            <label className="file-input-label">
              <span>{fileName || t('importUploadBtn')}</span>
              <input
                type="file"
                accept=".json,application/json"
                className="hidden-file-input"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <div className="divider-text">ИЛИ</div>

          {/* Paste Raw JSON */}
          <div className="form-group">
            <textarea
              rows={6}
              className="form-textarea json-textarea"
              placeholder={t('importPastePh')}
              value={jsonText}
              onChange={e => {
                setJsonText(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              {t('cancelBtn')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!jsonText.trim()}
            >
              <CheckCircle2 size={16} />
              <span>{t('importSubmitBtn')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
