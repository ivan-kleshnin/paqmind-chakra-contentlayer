import {defineDocumentType, makeSource} from "contentlayer/source-files"

// TYPES
const Account = defineDocumentType(() => ({
  name: "Account",
  filePathPattern: "accounts/*.md",
  fields: {
    id: {
      type: "string", required: true,
    },

    username: {
      type: "string", required: true,
    },

    role: {
      type: "enum", required: true,
      options: ["mentor", "student"],
    },

    fullname: {
      type: "string", required: true,
    },

    title: {
      type: "string", required: true,
    },

    contacts: {
      type: "json", required: true,
    },

    birthDate: {
      type: "date",
    },

    maritalStatus: {
      type: "string",
    },

    stats: {
      type: "json",
    },

    skills: {
      type: "json",
    },

    programs: {
      type: "json",
    },

    education: {
      type: "json",
    },

    interests: {
      type: "json",
    },

    languages: {
      type: "json",
    },

    studentsProjects: {
      type: "json",
    },

    avatarUrl: {
      type: "string",
    },

    avatarUrl2: {
      type: "string",
    },

    createdAt: {
      type: "date", required: true,
    },

    editedAt: {
      type: "date", required: true,
    },

    bonus: {
      type: "number", required: true,
    }
  },

  computedFields: {
    url: {
      type: "string",
      resolve: (page) => `/${page._raw.flattenedPath}`,
    },
  },
}))

const Testimonial = defineDocumentType(() => ({
  name: "Testimonial",
  filePathPattern: "testimonials/{to-accounts,to-courses}/*.md",
  fields: {
    id: {
      type: "string", required: true,
    },

    fromAccountId: {
      type: "string", required: true,
    },

    toAccountId: {
      type: "string",
    },

    toCourseId: {
      type: "string",
    },

    createdAt: {
      type: "date", required: true,
    },
  },
}))

const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "*.{md,mdx}",
  contentType: "mdx",
  fields: {
    title: {
      type: "string", required: true,
    },
    seoTitle: {
      type: "string",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (page) => `/${page._raw.flattenedPath}`,
    },
  },
}))

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "blog/*.{md,mdx}",
  contentType: "mdx",
  fields: {
    title: {
      type: "string", required: true,
    },
    seoTitle: {
      type: "string",
    },
    intro: {
      type: "markdown", required: true,
    },
    createdAt: {
      type: "date", required: true,
    },
    editedAt: {
      type: "date",
    },
    tags: {
      type: "list",
      of: {type: "string"},
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}))

// SOURCE
export default makeSource({
  contentDirPath: "content",
  documentTypes: [Account, Testimonial, Page, Post],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkUnwrapImages,
      remarkEmoji,
      () => {
        return remarkTextr({
          plugins: [
            "typographic-ellipses",
            "typographic-apostrophes",
            (str) => {
              return typographicQuotes(str, {locale: "en-us"})
            },
            "typographic-apostrophes-for-possessive-plurals",
          ]
        })
      },
    ],
    rehypePlugins: [
      // rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      // rehypeAutolinkHeadings,
      // rehypeAccessibleEmojis,
   ],
  },
})

import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import remarkEmoji from "remark-emoji"
import remarkTextr from "remark-textr"
// import rehypeSlug from "rehype-slug"
// import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypePrism from "rehype-prism-plus"
// import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import typographicQuotes from "typographic-quotes"

