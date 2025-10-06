import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  const form = e.currentTarget;
  const data = new FormData(form);

  // Convert FormData en URL-encoded pour Netlify Forms
  const encode = (data: FormData) => {
    return Array.from(data.entries())
      .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(String(value)))
      .join('&');
  };

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data),
    });

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error('Netlify a refusé le formulaire');
    }
  } catch (error) {
    console.error(error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  }
};


  return (
    <section>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Contact</h1>
      <p style={{ 
        textAlign: 'left', 
        marginBottom: '40px', 
        fontSize: '1.2rem',
        color: '#ccc',
        maxWidth: '600px',
        margin: '0 auto 40px',
        paddingLeft: '20px'
      }}>
        Envoyez-moi un message pour discuter de vos projets ou opportunités.
      </p>

      <div className="form-card">
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true" 
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />

          <div>
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre.email@exemple.com"
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Décrivez votre projet ou votre message..."
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>

          {submitStatus === 'success' && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid #22c55e',
              borderRadius: '8px',
              color: '#22c55e',
              textAlign: 'center'
            }}>
              ✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              color: '#ef4444',
              textAlign: 'center'
            }}>
              ❌ Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement à mlle.lacroixcamille@gmail.com .
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
