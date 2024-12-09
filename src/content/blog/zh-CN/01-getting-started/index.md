---
title: "开始使用"
description: "快速上手指南"
date: "Mar 22 2024"
draft: false
lang: "zh-CN"
---

Nano 的基本配置非常简单。

编辑 `src/consts.ts`

自定义网站基本信息

```ts 
// src/consts.ts

export const SITE: Site = {
  NAME: "Astro Nano",
  EMAIL: "markhorn.dev@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};
```

| 字段 | 必填 | 描述 |
| :---- | :-- | :-----------|
| NAME | 是 | 显示在页眉和页脚。用于 SEO 和 RSS。 |
| EMAIL | 是 | 显示在联系部分。 |
| NUM_POSTS | 是 | 首页显示的文章数量限制。 |
| NUM_WORKS | 是 | 首页显示的作品数量限制。 |
| NUM_PROJECTS | 是 | 首页显示的项目数量限制。 |

自定义页面元数据

```ts 
// src/consts.ts

export const HOME: Metadata = {
  TITLE: "首页",
  DESCRIPTION: "Astro Nano 是一个简约轻量的博客和作品集主题。",
};
```

| 字段 | 必填 | 描述 |
| :---- | :-- | :-----------|
| TITLE | 是 | 显示在浏览器标签。用于 SEO 和 RSS。 |
| DESCRIPTION | 是 | 用于 SEO 和 RSS。 |

自定义社交媒体链接

```ts 
// src/consts.ts

export const SOCIALS: Socials = [
  { 
    NAME: "twitter-x",
    HREF: "https://twitter.com/markhorn_dev",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/markhorn-dev"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/markhorn-dev",
  }
];
```

| 字段 | 必填 | 描述 |
| :---- | :-- | :-----------|
| NAME | 是 | 显示在联系部分的链接文本。 |
| HREF | 是 | 社交媒体个人资料的外部链接。 |