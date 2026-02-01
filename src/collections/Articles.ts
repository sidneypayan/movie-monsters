import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  BlocksFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  HeadingFeature,
  AlignFeature,
  IndentFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  LinkFeature,
  RelationshipFeature,
  BlockquoteFeature,
  UploadFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

// Generate URL-friendly slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
}

// Custom block for single image
const ImageBlock = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
      type: 'upload' as const,
      relationTo: 'media' as const,
      required: true,
      label: 'Image',
    },
    {
      name: 'caption',
      type: 'text' as const,
      label: 'Caption',
      localized: true,
    },
    {
      name: 'width',
      type: 'select' as const,
      label: 'Width',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Large (80%)', value: 'large' },
        { label: 'Medium (60%)', value: 'medium' },
        { label: 'Small (40%)', value: 'small' },
      ],
      defaultValue: 'full',
    },
  ],
}

// Custom block for image galleries
const ImageGalleryBlock = {
  slug: 'image-gallery',
  interfaceName: 'ImageGalleryBlock',
  fields: [
    {
      name: 'images',
      type: 'array' as const,
      label: 'Images',
      minRows: 2,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          type: 'upload' as const,
          relationTo: 'media' as const,
          required: true,
        },
        {
          name: 'caption',
          type: 'text' as const,
          localized: true,
        },
      ],
    },
    {
      name: 'columns',
      type: 'select' as const,
      label: 'Number of Columns',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      defaultValue: '3',
    },
  ],
}

// Custom block for YouTube embeds
const YouTubeBlock = {
  slug: 'youtube',
  interfaceName: 'YouTubeBlock',
  fields: [
    {
      name: 'videoId',
      type: 'text' as const,
      label: 'YouTube Video ID',
      required: true,
      admin: {
        description: 'YouTube video ID (e.g., dQw4w9WgXcQ from https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
      },
    },
    {
      name: 'caption',
      type: 'text' as const,
      label: 'Caption',
      localized: true,
    },
  ],
}

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedDate', 'status'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can only see published articles
      if (!user) {
        return { status: { equals: 'published' } }
      }
      return true
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              localized: true,
              unique: true,
              index: true,
              admin: {
                position: 'sidebar',
                description: 'Auto-generated from title. You can edit if needed.',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              hasMany: false,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'status',
              type: 'select',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
              ],
              defaultValue: 'draft',
              required: true,
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'publishedDate',
              type: 'date',
              required: true,
              admin: {
                position: 'sidebar',
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Short description for article cards and SEO',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              localized: true,
              editor: lexicalEditor({
                features: () => [
                  // Text formatting
                  ParagraphFeature(),
                  BoldFeature(),
                  ItalicFeature(),
                  UnderlineFeature(),
                  StrikethroughFeature(),
                  SubscriptFeature(),
                  SuperscriptFeature(),
                  InlineCodeFeature(),

                  // Headings
                  HeadingFeature({
                    enabledHeadingSizes: ['h2', 'h3', 'h4'],
                  }),

                  // Lists
                  UnorderedListFeature(),
                  OrderedListFeature(),
                  ChecklistFeature(),

                  // Alignment and indentation
                  AlignFeature(),
                  IndentFeature(),

                  // Links and relationships
                  LinkFeature({
                    enabledCollections: ['articles'],
                  }),
                  RelationshipFeature(),

                  // Blocks and media
                  BlockquoteFeature(),
                  UploadFeature({
                    collections: {
                      media: {
                        fields: [
                          {
                            name: 'caption',
                            type: 'text',
                            localized: true,
                          },
                        ],
                      },
                    },
                  }),
                  HorizontalRuleFeature(),

                  // Custom blocks
                  BlocksFeature({
                    blocks: [ImageBlock, ImageGalleryBlock, YouTubeBlock],
                  }),

                  // Toolbars
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              admin: {
                description: 'Override the page title for SEO (optional)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              maxLength: 160,
              admin: {
                description: 'SEO meta description (160 characters max)',
              },
            },
            {
              name: 'metaImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Override featured image for social sharing (optional)',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Auto-set author to current user if not set
        if (!data.author && req.user) {
          data.author = req.user.id
        }

        // Auto-generate slug from title if not provided
        if (data.title && !data.slug) {
          data.slug = generateSlug(data.title)
        }

        return data
      },
    ],
  },
}
