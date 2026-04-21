import { useState } from 'react';
import toast from 'react-hot-toast';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, MessageCircleIcon, SendIcon } from '../components/Icons';
import { WhatsAppIcon } from '../components/Icons';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields.'); return; }
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll respond within 24 hours.");
      setForm({ name: '', email: '', subject: '', message: '' });
      setSending(false);
    }, 1200);
  };

  const CONTACT_INFO = [
    { Icon: MapPinIcon, title: 'Address', info: '123 Green Park, Eco Nagar, Mumbai - 400001, Maharashtra' },
    { Icon: PhoneIcon, title: 'Phone', info: '+91 98765 43210' },
    { Icon: MailIcon, title: 'Email', info: 'hello@ecobags.in' },
    { Icon: ClockIcon, title: 'Working Hours', info: 'Mon–Sat: 9:00 AM – 6:00 PM' },
  ];

  return (
    <div className="min-h-screen pt-20 page-enter">
      {/* Hero */}
      <div className="gradient-hero py-16 text-center px-4">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <MessageCircleIcon className="w-7 h-7 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-green-900 mb-3">Get in Touch</h1>
        <p className="text-green-700">We'd love to hear from you. Our team is here to help!</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-6">Contact Information</h2>
            {CONTACT_INFO.map(({ Icon, title, info }) => (
              <div key={title} className="flex gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 text-sm">{title}</p>
                  <p className="text-gray-600 text-sm">{info}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210?text=Hello%20EcoBags!%20I%20need%20help."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors mt-4"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-green-900 mb-5">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Name *</label>
                <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="How can we help?" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="input-field resize-none" placeholder="Tell us more..." />
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full py-3 justify-center flex items-center gap-2">
                {sending
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</>
                  : <><SendIcon className="w-4 h-4" />Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
