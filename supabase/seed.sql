-- ============================================================================
-- DzPhy — Seed for public.content
-- ----------------------------------------------------------------------------
-- YouTube & TikTok are fetched LIVE (YouTube RSS/Data API, TikTok oEmbed) so
-- they don't need seeding. Instagram has no free public listing API, so its
-- posts live here and persist across redeploys. Run after 0001_content_model.sql.
-- Safe to re-run: upserts on (platform, external_id).
-- ============================================================================

insert into public.content
  (platform, source, external_id, type, title, description, thumbnail, url, subject, level, category, is_active, sort_order)
values
  ('instagram','@prof_pica','DbpnOFVtwcR','post',
   'كيفية استعمال الحاسبة CASIO fx-991ES 🧮',
   'شرح عملي للآلة الحاسبة — ضروري لكل تلميذ في العلوم الفيزيائية',
   '/social/ig_casio.jpg','https://www.instagram.com/reel/DbpnOFVtwcR/',
   'الفيزياء',null,'منشور',true,10),

  ('instagram','@prof_pica','DaIUeL-NJl2','post',
   '#العلوم_الفيزيائية #bac2027 #motivation 🔥',
   'تحفيز لطلبة البكالوريا — استعد بقوة للسنة الدراسية الجديدة',
   '/social/ig_motivation.jpg','https://www.instagram.com/reel/DaIUeL-NJl2/',
   'الفيزياء','bac','تحفيز',true,20),

  ('instagram','@prof_pica','DbsNJtEjcom','post',
   'منشور جديد من الأستاذ بيكا ✍️',
   'أحدث منشور على إنستغرام — تابع الصفحة أولًا بأول',
   '/social/ig_post_aug6.jpg','https://www.instagram.com/p/DbsNJtEjcom/',
   null,null,'منشور',true,30),

  ('instagram','@prof_pica','DbpmNiAjSnQ','post',
   'الأستاذ بيكا — الهوية الجديدة 🐺',
   'العلامة الجديدة لمحتوى العلوم الفيزيائية',
   '/social/ig_wolf.jpg','https://www.instagram.com/p/DbpmNiAjSnQ/',
   null,null,'منشور',true,40),

  ('instagram','@prof_pica','DbqFV68DRUQ','post',
   'دروس الدعم لجميع المستويات 🎯',
   'دروس خصوصية لكل الشعب والمستويات — BAC، 2AS، 1AS و BEM',
   '/social/ig_poster.jpg','https://www.instagram.com/p/DbqFV68DRUQ/',
   null,null,'إعلان',true,50),

  ('instagram','@prof_pica','Dbj3OOQq6sX','post',
   'منشورات يومية من الأستاذ بيكا',
   'ملخصات يومية ونظام الكاروزول — تابع حساب إنستغرام الرسمي',
   '/social/ig_aug2.jpg','https://www.instagram.com/p/Dbj3OOQq6sX/',
   null,null,'ملخص',true,60)

on conflict (platform, external_id) do update set
  title       = excluded.title,
  description = excluded.description,
  thumbnail   = excluded.thumbnail,
  url         = excluded.url,
  category    = excluded.category,
  is_active   = excluded.is_active,
  sort_order  = excluded.sort_order;
