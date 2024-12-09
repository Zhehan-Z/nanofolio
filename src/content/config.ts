import { defineCollection, z } from "astro:content";
import { AcademicProjectType } from "../consts";

const languages = ["en", "zh-CN"] as const;

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    lang: z.enum(languages).default("en")
  }),
});

const academic = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    projectType: z.nativeEnum(AcademicProjectType),
    course: z.string().optional(),
    instructor: z.string().optional(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
    role: z.string(),
    technologies: z.array(z.string()),
    links: z.array(z.object({
      text: z.string(),
      url: z.string().url(),
      icon: z.string().optional()
    })).optional()
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(languages).default("en"),
    draft: z.boolean().optional(),
    links: z.array(z.object({
      text: z.string(),
      url: z.string().url(),
      icon: z.string().optional()
    })).optional()
  }),
});

export const collections = { blog, academic, projects };