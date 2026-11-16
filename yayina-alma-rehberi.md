# Fueno Coffee & Roastery — fuenoshop.com

Tam site hazır. Artık sadece menü değil: **Hikâyemiz, Galeri, Menü, Roastery ve İletişim**
bölümleri olan, Türkçe/İngilizce tek sayfa bir site.

---

## Yayına alma (2 dakika)

1. **https://app.netlify.com/drop** adresini açın.
2. `fueno-site.zip` dosyasını sayfaya **sürükleyip bırakın** (zip'i açmayın).
3. Yükleme biter bitmez yeni site canlıya çıkar.

Zaten `fuenoshop.com` bağlı bir Netlify siteniz varsa daha da kolay:
o sitenin panelinde **Deploys** sekmesine gidip zip'i oradaki alana bırakın —
alan adı ayarlarına dokunmanıza gerek kalmaz, site yerinde güncellenir.

---

## Sitede neler var

| Bölüm | İçerik |
|---|---|
| **Hero** | **Üç fotoğraflık geçişli slayt** — gece terası, gündüz cephe, kokteyller. Yavaş yakınlaşma efekti, altta nokta göstergeler |
| **Hızlı erişim şeridi** | WhatsApp, Instagram, Google yorumları, yol tarifi |
| **Gündüz / Gece** | Tam genişlikte ikili panel: gündüz cephe ve gece terası yan yana |
| **Hikâyemiz** | Kafenin hikâyesi + 3 değer kartı (kendi kavurmamız / özenli demleme / tatlılar) |
| **Galeri** | 13 görsellik ızgara — 6 gerçek mekân fotoğrafı + menü görselleri. Tıklayınca büyür, ok tuşlarıyla gezilir |
| **Menü** | 12 kategori, 87 ürün, fiyatlarıyla. Arama kutusu + açılır kategoriler |
| **Kutlamalar** | Doğum günü ve özel gün organizasyonu, *Fueno Love* duvarı fotoğrafıyla + WhatsApp |
| **Roastery** | Çekirdekten fincana 3 adım + WhatsApp'tan çekirdek siparişi |
| **İletişim** | Telefon, WhatsApp, Instagram, Google yorumları, yol tarifi |

**Diller:** Sağ üstteki `TR / EN` düğmesiyle tüm site anında İngilizceye geçer —
87 ürünün adı ve açıklaması dahil. Seçim hatırlanır. `fuenoshop.com/?lang=en`
adresi doğrudan İngilizce açar.

**Tema:** Koyu/açık mod düğmesi. Ziyaretçinin telefonunun ayarına göre başlar,
seçimi hatırlanır.

**Arama:** Türkçe karakterden bağımsız çalışır — "fistik" yazan da
"FISTIKLI SAN SEBASTIAN CHEESECAKE"i bulur.

---

## Sizden bekleyen 3 bilgi

Bunlar gelince sitede tek satır değişiklikle güncellenir. Bana yazmanız yeterli.

### 1. Adres — *en önemlisi*

Şu an sitede adres yok. Google'da "yakınımdaki kafe" araması yapanların size
ulaşması için bu gerekli. "Yol tarifi al" butonu şimdilik Google'da
"Fueno Coffee Roastery" araması yapıyor — çalışıyor ama tam isabetli değil.

Bana açık adresi (mahalle, cadde, no, ilçe, il) gönderin; hem sayfaya hem de
Google'ın okuduğu işletme verisine eklerim, haritayı da gömerim.

### 2. Çalışma saatleri

Örn. "Pazartesi–Pazar 08:00–01:00" ya da günlere göre farklıysa hepsi.
İletişim bölümüne bir saat tablosu ekleyeceğim.

### 3. "Kutlamalar" bölümünü onaylayın

Gönderdiğiniz doğum günü fotoğrafından yola çıkarak bir **Kutlamalar** bölümü
ekledim: doğum günü, baby shower, yıl dönümü ve küçük gruplar için mekânı
süslediğinizi anlatıyor, WhatsApp'a yönlendiriyor.

Bu hizmeti gerçekten veriyorsanız olduğu gibi kalsın. Vermiyorsanız ya da
farklı anlatmak isterseniz söyleyin — düzeltirim veya bölümü kaldırırım.
Süsleme fiyatı, minimum kişi sayısı gibi detaylar varsa onları da ekleyebilirim.

### Bonus: daha fazla fotoğraf her zaman iyi

Barista çalışırken, kavurma makinesi, tabak servisi, gündüz kalabalık teras…
Ne gönderirseniz galeriye ve bölümlere yerleştiririm.

---

## Bilmeniz gereken küçük şeyler

- **"rentondiji.com tarafından yapılmıştır" imzası kaldırıldı.** Bu yeni site
  sıfırdan yazıldı, o imza artık doğru değildi. Menü içeriği ve görseller
  elbette sizin.
- **İngilizce dil butonu artık gerçekten çalışıyor.** Eskisi sizi eski QR menü
  servisine götürüyordu.
- **Fotoğraflarınız işlendi.** İki ekran görüntüsündeki telefon çubukları
  kırpıldı, karanlık gece kareleri hafifçe açıldı, hepsi web için sıkıştırıldı.
- **Menü görsellerindeki yazılar Türkçe.** Ürün afişleri sabit görsel olduğu
  için İngilizce modda da Türkçe kalıyor. Çoğu zaten uluslararası isim
  (FROZEN, ICE LATTE), sorun olmuyor.
- **Eski adresler yönlendirildi:** `fuenoshop.com/menu` ve `fuenoshop.com/m/fueno`
  doğrudan menü bölümüne gider. QR kodunuz hangisine bakıyorsa çalışmaya devam eder.

## Menüyü güncellemek istediğinizde

Fiyat veya ürün değişikliklerini bana yazın, güncel zip'i hazırlayıp göndereyim —
tek yapmanız gereken yine Netlify'a sürüklemek. Kendiniz düzenlemek isterseniz
`index.html` içinde ürün adları ve fiyatlar düz metin olarak duruyor;
İngilizce karşılıkları dosyanın sonundaki `FUENO_MENU_EN` listesinde.

## Klasör içeriği

```
index.html          Sitenin tamamı (tek sayfa)
404.html            Bulunamayan sayfa
og-image.jpg        WhatsApp/Instagram paylaşım görseli (1200×630)
favicon.ico         Sekme ikonu
site.webmanifest    Telefonda "ana ekrana ekle"
robots.txt          Arama motoru yönergeleri
sitemap.xml         Site haritası (TR + EN)
netlify.toml        Önbellek, güvenlik başlıkları, yönlendirmeler
assets/site.css     Site tasarımı
assets/site.js      Dil, tema, menü, galeri etkileşimleri
assets/fonts.css    Yazı tipleri
icons/              Favicon ve mobil ikonlar
images/             94 görsel (6 gerçek mekân fotoğrafı + menü görselleri)
```
