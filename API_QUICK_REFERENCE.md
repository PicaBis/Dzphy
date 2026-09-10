# 🔌 دليل APIs السريع

## 📊 API الإحصائيات

### `GET /api/stats`
جلب إحصائيات جميع المنصات الاجتماعية

**بدون معاملات:**
```bash
curl http://localhost:3000/api/stats
```

**الاستجابة:**
```json
{
  "youtube": {
    "subscribers": 8500,
    "videos": 120,
    "views": 500000
  },
  "tiktok": {
    "followers": 50000,
    "likes": 2500000,
    "videos": 85
  },
  "instagram": {
    "followers": 12000,
    "posts": 180
  },
  "facebook": {
    "followers": 5000,
    "likes": 35000
  },
  "telegram": {
    "members": 3500
  },
  "total": {
    "followers": 79000,
    "views": 500000,
    "videos": 205
  }
}
```

**Cache:** 1 ساعة

---

## 📱 API المنشورات الاجتماعية

### `GET /api/social`
جلب المنشورات من TikTok و Instagram

**بدون معاملات (جميع المنشورات):**
```bash
curl http://localhost:3000/api/social
```

**جلب TikTok فقط:**
```bash
curl http://localhost:3000/api/social?platform=tiktok
```

**جلب Instagram فقط:**
```bash
curl http://localhost:3000/api/social?platform=instagram
```

**الاستجابة:**
```json
{
  "success": true,
  "count": 12,
  "posts": [
    {
      "id": "tt-20of20",
      "platform": "tiktok",
      "title": "طريقك نحو الـ 20/20 يبدأ من هنا! 🎓",
      "description": "أسرار المكتسبات القبلية لبكالوريا 2027",
      "url": "https://www.tiktok.com/@profpica/video/7663056270466747665",
      "thumbnail": "/social/tt_20of20.jpg",
      "badge": "أهم مقطع",
      "gradient": "from-gray-800 to-black"
    }
  ],
  "platforms": {
    "tiktok": 6,
    "instagram": 6
  }
}
```

**Cache:** 1 ساعة

---

### `GET /api/social/latest`
جلب أحدث المنشورات من كلا المنصتين

**بدون معاملات:**
```bash
curl http://localhost:3000/api/social/latest
```

**الاستجابة:**
```json
{
  "success": true,
  "count": 12,
  "posts": [...],
  "tiktok": [...],
  "instagram": [...]
}
```

**Cache:** 1 ساعة

---

## 🎬 API قوائم التشغيل (YouTube)

### `GET /api/playlists`
جلب قوائم التشغيل المتاحة

**بدون معاملات (جميع القوائم):**
```bash
curl http://localhost:3000/api/playlists
```

**تصفية حسب المستوى:**
```bash
# السنة الأولى
curl http://localhost:3000/api/playlists?level=1as

# السنة الثانية
curl http://localhost:3000/api/playlists?level=2as

# السنة الثالثة
curl http://localhost:3000/api/playlists?level=3as

# الرابعة متوسط
curl http://localhost:3000/api/playlists?level=bem
```

**تصفية حسب النوع:**
```bash
# الدروس فقط
curl http://localhost:3000/api/playlists?type=lessons

# الدورات والبثوث فقط
curl http://localhost:3000/api/playlists?type=courses

# الأفكار والثغرات فقط
curl http://localhost:3000/api/playlists?type=ideas
```

**تصفية متقدمة:**
```bash
# دروس السنة الثالثة فقط
curl http://localhost:3000/api/playlists?level=3as&type=lessons

# دورات معينة
curl http://localhost:3000/api/playlists?type=courses
```

**الاستجابة:**
```json
[
  {
    "id": "3as-lessons",
    "title": "دروس السنة الثالثة ثانوي",
    "levelKey": "3as",
    "levelLabel": "السنة الثالثة ثانوي",
    "stream": "العلوم الفيزيائية",
    "description": "جميع دروس السنة الثالثة ثانوي مشروحة بالتفصيل",
    "playlistId": "PLGRsyA_VAyBUh27KazoXi7UkRxdFIuJJW",
    "videoId": "-L5lScjATK0",
    "gradient": "from-amber-400 to-yellow-600",
    "accent": "text-amber-500",
    "badge": "3AS",
    "type": "lessons",
    "playlistUrl": "https://www.youtube.com/playlist?list=PLGRsyA_VAyBUh27KazoXi7UkRxdFIuJJW",
    "videos": [
      {
        "id": "-L5lScjATK0",
        "title": "الدرس الأول",
        "duration": "15:30",
        "viewCount": "25000"
      }
    ]
  }
]
```

**Cache:** 1 ساعة

---

## 📚 الدروس (المحتوى)

### جلب دروس مستوى معين

```typescript
import { getGradeLessons } from "@/data/lessons";

// Grade 2
const grade2 = getGradeLessons("2");
console.log(grade2?.seasons); // 3 فصول

// Grade 3 (BAC)
const grade3 = getGradeLessons("3");

// Grade 4 (BEM)
const grade4 = getGradeLessons("4");

// Grade 1
const grade1 = getGradeLessons("1");
```

**البنية:**
```typescript
{
  seasons: [
    {
      id: "winter",
      title: "الفصل الأول",
      subtitle: "الشتاء",
      units: [
        {
          id: "unit1",
          title: "الوحدة 1",
          lessons: [
            {
              id: "lesson1",
              title: "عنوان الدرس",
              description: "وصف الدرس",
              parts: [
                {
                  id: "part1",
                  title: "الجزء الأول",
                  fileUrl: "/files/lessons/...",
                  sizeMB: 0.7
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 🛠️ مثال عملي - استخدام في React

### عرض الإحصائيات
```tsx
import { useEffect, useState } from 'react';

export function StatsWidget() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      <p>المتابعون: {stats.total.followers.toLocaleString('ar-DZ')}</p>
      <p>المشاهدات: {stats.total.views.toLocaleString('ar-DZ')}</p>
      <p>الفيديوهات: {stats.total.videos}</p>
    </div>
  );
}
```

### عرض أحدث المنشورات
```tsx
import { fetchLatestSocialPosts } from '@/lib/social-helpers';
import { useEffect, useState } from 'react';

export function LatestPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchLatestSocialPosts().then(setPosts);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {posts.map(post => (
        <a key={post.id} href={post.url} target="_blank">
          <img src={post.thumbnail} alt={post.title} />
          <h3>{post.title}</h3>
          <p>{post.platform}</p>
        </a>
      ))}
    </div>
  );
}
```

### عرض الدورات
```tsx
import { useEffect, useState } from 'react';
import type { PlaylistResponse } from '@/app/api/playlists/route';

export function CoursesDisplay() {
  const [courses, setCourses] = useState<PlaylistResponse[]>([]);

  useEffect(() => {
    fetch('/api/playlists?type=courses')
      .then(r => r.json())
      .then(setCourses);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {courses.map(course => (
        <a key={course.id} href={course.playlistUrl}>
          <img 
            src={`https://i.ytimg.com/vi/${course.videoId}/mqdefault.jpg`}
            alt={course.title}
          />
          <h3>{course.title}</h3>
          <p>{course.videos.length} فيديو</p>
        </a>
      ))}
    </div>
  );
}
```

---

## 🔄 معدلات التحديث

| API | Cache | الوصف |
|-----|-------|-------|
| `/api/stats` | 1 ساعة | إحصائيات المنصات |
| `/api/social` | 1 ساعة | المنشورات الاجتماعية |
| `/api/social/latest` | 1 ساعة | أحدث المنشورات |
| `/api/playlists` | 1 ساعة | قوائم التشغيل |

---

## ⚙️ متغيرات البيئة

```env
# YouTube
YOUTUBE_SUBSCRIBERS=8500
YOUTUBE_VIDEOS=120
YOUTUBE_VIEWS=500000

# TikTok
TIKTOK_FOLLOWERS=50000
TIKTOK_LIKES=2500000
TIKTOK_VIDEOS=85

# Instagram
INSTAGRAM_FOLLOWERS=12000
INSTAGRAM_POSTS=180

# Facebook
FACEBOOK_FOLLOWERS=5000
FACEBOOK_LIKES=35000

# Telegram
TELEGRAM_MEMBERS=3500
```

---

## 🚨 معالجة الأخطاء

**جميع الـ APIs لها fallback للبيانات الثابتة في حالة الفشل:**

```json
{
  "success": false,
  "error": "Failed to fetch...",
  "posts": [...] // بيانات fallback
}
```

---

## 📞 الدعم والمساعدة

للمزيد من المعلومات، راجع:
- `IMPLEMENTATION_SUMMARY.md` - شرح مفصل
- `API_DOCUMENTATION.md` - توثيق API سابق
- `src/lib/social-helpers.ts` - مكتبة الدوال

---

**تم تحديثه:** 10 سبتمبر 2026
