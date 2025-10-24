import '../index.css';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Contacts = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src =
      'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A66602e8a473e36516939f83d512c492b70cc7b4ca0647f48226eea89086c34da&width=500&height=400&lang=ru_RU&scroll=true';

    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      mapContainer.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <main className='content'>
      <h2 className='content__header'>
        КОНТАКТЫ СТРОИТЕЛЬНОГО МАГАЗИНА "СТОЛПЛИТ"
      </h2>
      <p>
        Мы всегда рады новым клиентам и партнерам! Магазин{' '}
        <strong>"Столплит"</strong>
        расположен в удобной транспортной развязке и легко доступен на личном и
        общественном транспорте. Приезжайте знакомиться с нашим ассортиментом.
      </p>
      <p>
        Для консультации по товарам или оформления заказа свяжитесь с нами любым
        удобным способом. Наши менеджеры
        <em> ответят на все ваши вопросы</em> и помогут подобрать подходящие
        материалы для вашего проекта.
      </p>
      <h3 className='section__header' id='contacts'>
        Контактная информация:
      </h3>
      <table border='3' cellPadding='20' cellSpacing='5'>
        <tbody>
          <tr>
            <td rowSpan='3'>Способы связи</td>
            <td colSpan='2' align='center'>
              Контактные данные
            </td>
          </tr>
          <tr>
            <td>Телефоны</td>
            <td>Электронная почта</td>
          </tr>
          <tr>
            <td>+7 (495) 123-45-67</td>
            <td>info@stolplit.ru</td>
          </tr>
        </tbody>
      </table>
      <h3 className='section__header' id='work_hours'>
        Режим работы:
      </h3>
      <ul className='list__circle'>
        <li>Понедельник-пятница: 8:00 - 20:00</li>
        <li>Суббота: 9:00 - 18:00</li>
        <li>Воскресенье: 10:00 - 16:00</li>
      </ul>
      <h3 className='section__header'>Как добраться:</h3>
      <ol className='list__alphabet-lower'>
        <li>Станция метро "Строителей"</li>
        <li>Выход к строительному рынку</li>
        <li>7 минут пешком по улице Промышленной</li>
      </ol>

      <h3 className='section__header' id='map'>
        Мы на карте:
      </h3>
      <div id='map-container' className='map-container'></div>

      <h3 className='section__header'>Отделы магазина:</h3>
      <ol className='list__alphabet-upper'>
        <li>Администрация</li>
        <li>
          Торговый зал
          <ol className='list__alphabet-lower'>
            <li>Консультации по товарам</li>
            <li>Оформление заказов</li>
          </ol>
        </li>
        <li>Склад и доставка</li>
      </ol>
      <p>
        Ждем вас в гости! Не стесняйтесь обращаться - мы поможем вам
        <strong> подобрать оптимальные решения</strong> для вашего ремонта или
        строительства. Помните: качественные материалы -
        <em> залог успешного проекта</em>!
      </p>
    </main>
  );
};
