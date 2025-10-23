import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { analytics } from '@/lib/analytics';

interface ContactsSectionProps {
  language: 'ru' | 'en';
  onPrivacyClick: () => void;
}

export const ContactsSection = ({
  language,
  onPrivacyClick,
}: ContactsSectionProps) => {
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.trackFormSubmit('contact_form');
    analytics.trackBooking('contact_form');
    const message = `Новая запись:%0AИмя: ${form.name}%0AТелефон: ${form.phone}`;
    window.open(`https://wa.me/79841563771?text=${message}`, '_blank');
  };

  return (
    <section id="contacts" className="py-20 px-4 fade-in-section">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          {language === 'ru' ? 'Контакты' : 'Contacts'}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-black/50 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6">
                {language === 'ru' ? 'Записаться' : 'Book Now'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{language === 'ru' ? 'Ваше имя' : 'Your Name'}</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-black/50 border-primary/30"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{language === 'ru' ? 'Телефон' : 'Phone'}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="bg-black/50 border-primary/30"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {language === 'ru' ? 'Отправить заявку' : 'Submit Request'}
                </Button>
                <p className="text-xs text-gray-400 text-center mt-4">
                  {language === 'ru' ? 'Нажимая кнопку, вы соглашаетесь с ' : 'By clicking the button, you agree to the '}
                  <button
                    type="button"
                    onClick={onPrivacyClick}
                    className="text-primary hover:underline"
                  >
                    {language === 'ru' ? 'политикой конфиденциальности' : 'privacy policy'}
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className="bg-black/50 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Icon name="MapPin" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold">{language === 'ru' ? 'Адрес' : 'Address'}</p>
                    <p className="text-gray-300">
                      {language === 'ru' ? 'г.Владивосток, адм.Фокина 9а' : 'Vladivostok, Fokina st., 9a'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black/50 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Icon name="Phone" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold">{language === 'ru' ? 'Телефон' : 'Phone'}</p>
                    <a href="tel:+79841563771" className="text-gray-300 hover:text-primary">
                      +7 (984) 156-37-71
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-black/50 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Icon name="Clock" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold">{language === 'ru' ? 'Режим работы' : 'Working Hours'}</p>
                    <p className="text-gray-300">
                      {language === 'ru' ? 'Ежедневно 10:00 - 22:00' : 'Daily 10:00 - 22:00'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-8 bg-black/50 border-primary/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full h-[400px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=131.886116,43.115536&z=17&l=map&pt=131.886116,43.115536,pm2rdm"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                style={{ position: 'relative' }}
                title={language === 'ru' ? 'Карта расположения Onebarbershop' : 'Onebarbershop location map'}
              />
            </div>
            <div className="p-4 bg-black/70">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary">Onebarbershop</p>
                  <p className="text-sm text-gray-300">
                    {language === 'ru' ? 'г.Владивосток, адм.Фокина 9а' : 'Vladivostok, Fokina st., 9a'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://yandex.ru/maps/?text=Владивосток, Фокина 9а', '_blank')}
                >
                  <Icon name="Navigation" size={16} className="mr-2" />
                  {language === 'ru' ? 'Построить маршрут' : 'Get Directions'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};