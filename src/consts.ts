export type Site = {
  NAME: string;
  EMAILS: Array<{
    address: string;
    label?: string;
    primary?: boolean;
  }>;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
  NUM_ACADEMIC_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];

export enum AcademicProjectType {
  COURSEWORK = "coursework",
  RESEARCH = "research",
  INTERNSHIP = "internship",
  VOLUNTEER = "volunteer",
  EXTRACURRICULAR = "extracurricular",
  THESIS = "thesis",
  INDEPENDENT_STUDY = "independent_study",
  TEACHING = "teaching",
  WORKSHOP = "workshop",
  COMPETITION = "competition",
  PUBLICATION = "publication",
  PRESENTATION = "presentation",
  LAB_WORK = "lab_work",
  STUDY_ABROAD = "study_abroad",
  CERTIFICATION = "certification"
}

export const SITE: Site = {
  NAME: "ZhehanZ",
  EMAILS: [
    { 
      address: "me@zheha.nz",
      label: "Personal",
      primary: true
    },
    {
      address: "zhehan.z@hotmail.com",
      label: "Personal"
    },
    {
      address: "zhang.zhehan@nfls.partner.onmschina.cn",
      label: "Academic"
    }
  ],
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
  NUM_ACADEMIC_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Student portfolio showcasing academic projects and experiences.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const ACADEMIC: Metadata = {
  TITLE: "Academic Experience",
  DESCRIPTION: "A showcase of my coursework, research, and academic experiences.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/zhehan-z"
  },
  { 
    NAME: "twitter (x)",
    HREF: "https://twitter.com/Zhehan_Z",
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/%E5%93%B2%E6%B6%B5-%E5%BC%A0-306304300",
  },
  { 
    NAME: "bilibili",
    HREF: "https://space.bilibili.com/477193009",
  },
  { 
    NAME: "zhihu",
    HREF: "https://www.zhihu.com/people/zhang-zhe-han-56",
  },
  { 
    NAME: "xiaohongshu",
    HREF: "https://www.zhihu.com/people/zhang-zhe-han-56",
  },
  { 
    NAME: "instagram",
    HREF: "https://www.instagram.com/eric.zhehanz",
  },
  { 
    NAME: "douban",
    HREF: "https://douban.com/people/zhehanzhang/",
  },
  { 
    NAME: "youtube",
    HREF: "https://youtube.com/@zhehanz",
  },
  { 
    NAME: "reddit",
    HREF: "https://www.reddit.com/user/zhehanzhang/",
  },
  { 
    NAME: "stackexchange",
    HREF: "https://stackexchange.com/users/37622190/zhehanz",
  },
];