import { useTranslation } from 'react-i18next';
import { useContactForm } from '../hooks/useContactForm';
import '../styles/contact.css';

export function ContactPage() {
  const { formData, isSubmitting, submitStatus, handleChange, handleSubmit } = useContactForm();
  const { t } = useTranslation('contact');

  return (
    <section>
      <h1 className="contact-page-title">{t('title')}</h1>
      <p className="contact-page-subtitle">{t('subtitle')}</p>

      <div className="form-card">
        <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact" />

          <div>
            <label htmlFor="name">{t('form.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t('form.name_placeholder')}
            />
          </div>

          <div>
            <label htmlFor="email">{t('form.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t('form.email_placeholder')}
            />
          </div>

          <div>
            <label htmlFor="message">{t('form.message')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder={t('form.message_placeholder')}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('form.submitting') : t('form.submit')}
          </button>
          {submitStatus === 'success' && (
            <div className="form-feedback form-feedback--success">{t('feedback.success')}</div>
          )}
          {submitStatus === 'error' && (
            <div className="form-feedback form-feedback--error">{t('feedback.error')}</div>
          )}
        </form>
      </div>
    </section>
  );
}
