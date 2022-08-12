# Персональная рекомендательная система музыки

Node.js приложение. Написано в 2019 году для себя.

**Функционал:**

Персональная рекомендательная система для пользователей сервиса Яндекс Музыка.  
Согласно настройкам блэклистов жанров сервиса Яндекс Музыка и жанрам сервиса LastFM (для более тонкой настройки предпочтений) выполняет обход базы артистов сервиса ЯМ и согласно настройкам приложения добавляет подходящие треки в отдельный плейлист пользователя.  

**Используемые технологии:**
- **Непубличное** Api сервиса Яндекс Музыка.
- **Cheerio** — для парсинга сайта LastFM, тк их апи выдает нерелевантные результаты.
- **Tor** - для избежания блокировок по айпи.
- **Puppeteer** - для добавления отобранных треков в отдельный плейлист в веб-версии ЯМ.

**Настройки приложения:**  
settings.json
```
{
"pathTor": "", Полный путь к клиенту тор
"UID": "", UID юзера на сайте yandex music
"artistShouldHaveMinimumLikes": 5000, Минимальное количество лайков, которые артист должен иметь в сервисе яндекс музыка
"howManyTracksAdd": 3, Количество топовых треков для добавления в плейлист
"playlistPrefix": "auto pls" Префикс в названии плейлиста, в которые будут добавляться отобранные треки
}
```