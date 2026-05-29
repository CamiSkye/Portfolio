import { useState } from 'react';

type SubmitStatus = 'idle' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
};

function encodeFormData(data: FormData): string {
  return Object.entries(data)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
    .join('&');
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({ ...formData, 'form-name': 'contact' } as unknown as FormData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(initialFormData);
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

  return { formData, isSubmitting, submitStatus, handleChange, handleSubmit };
}