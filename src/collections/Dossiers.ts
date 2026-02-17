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
import { ImageBlock, ImageGalleryBlock, YouTubeBlock } from './shared/blocks'

// Generate URL-friendly slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Extract first sentence from Lexical editor content
const extractFirstSentence = (content: any): string => {
  if (!content?.root?.children) return ''

  for (const node of content.root.children) {
    if (node.type === 'paragraph' && node.children) {
      let fullText = ''

      for (const child of node.children) {
        if (child.type === 'text' && child.text) {
          fullText += child.text
        }
      }

      if (fullText) {
        const match = fullText.match(/^[^.!?]+[.!?]/)
        const sentence = match ? match[0] : fullText

        if (sentence.length > 160) {
          return sentence.substring(0, 157) + '...'
        }
        return sentence
      }
    }
  }

  return ''
}

export const Dossiers: CollectionConfig = {
  slug: 'dossiers',
  labels: {
    singular: { en: 'Dossier', fr: 'Dossier' },
    plural: { en: 'Dossiers', fr: 'Dossiers' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedDate', 'status'],
  },
  access: {
    read: ({ req: { user } }) => {
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
          label: { en: 'Content', fr: 'Contenu' },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: { en: 'Title', fr: 'Titre' },
              required: true,
              localized: true,
            },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug',
              required: true,
              localized: true,
              unique: true,
              index: true,
              admin: {
                description: {
                  en: 'Auto-generated from title. You can edit if needed.',
                  fr: 'Généré automatiquement à partir du titre. Vous pouvez modifier si nécessaire.',
                },
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: { en: 'Excerpt', fr: 'Extrait' },
              required: false,
              localized: true,
              admin: {
                description: {
                  en: 'Auto-generated from first sentence. You can override if needed.',
                  fr: 'Généré automatiquement à partir de la première phrase. Vous pouvez modifier si nécessaire.',
                },
              },
            },
            {
              type: 'collapsible',
              label: { en: 'Media & Metadata', fr: 'Médias & Métadonnées' },
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'category',
                      type: 'relationship',
                      label: { en: 'Category', fr: 'Catégorie' },
                      relationTo: 'categories',
                      required: true,
                      hasMany: false,
                      admin: {
                        width: '33%',
                      },
                    },
                    {
                      name: 'status',
                      type: 'select',
                      label: { en: 'Status', fr: 'Statut' },
                      options: [
                        { label: { en: 'Draft', fr: 'Brouillon' }, value: 'draft' },
                        { label: { en: 'Published', fr: 'Publié' }, value: 'published' },
                      ],
                      defaultValue: 'draft',
                      required: true,
                      admin: {
                        width: '33%',
                      },
                    },
                    {
                      name: 'publishedDate',
                      type: 'date',
                      label: { en: 'Published Date', fr: 'Date de publication' },
                      required: true,
                      admin: {
                        width: '34%',
                        date: {
                          pickerAppearance: 'dayOnly',
                        },
                      },
                    },
                  ],
                },
                {
                  name: 'author',
                  type: 'relationship',
                  label: { en: 'Author', fr: 'Auteur' },
                  relationTo: 'users',
                  required: true,
                  admin: {
                    hidden: true,
                  },
                },
                {
                  name: 'featuredImage',
                  type: 'upload',
                  label: { en: 'Featured Image', fr: 'Image mise en avant' },
                  relationTo: 'media',
                  required: false,
                },
              ],
            },
            {
              name: 'content',
              type: 'richText',
              label: { en: 'Content', fr: 'Contenu' },
              required: true,
              localized: true,
              editor: lexicalEditor({
                features: () => [
                  ParagraphFeature(),
                  BoldFeature(),
                  ItalicFeature(),
                  UnderlineFeature(),
                  StrikethroughFeature(),
                  SubscriptFeature(),
                  SuperscriptFeature(),
                  InlineCodeFeature(),

                  HeadingFeature({
                    enabledHeadingSizes: ['h2', 'h3', 'h4'],
                  }),

                  UnorderedListFeature(),
                  OrderedListFeature(),
                  ChecklistFeature(),

                  AlignFeature(),
                  IndentFeature(),

                  LinkFeature({
                    enabledCollections: ['articles', 'dossiers'],
                  }),
                  RelationshipFeature(),

                  BlockquoteFeature(),
                  UploadFeature({
                    collections: {
                      media: {
                        fields: [
                          {
                            name: 'caption',
                            type: 'text',
                            label: { en: 'Caption', fr: 'Légende' },
                            localized: true,
                          },
                        ],
                      },
                    },
                  }),
                  HorizontalRuleFeature(),

                  BlocksFeature({
                    blocks: [ImageBlock, ImageGalleryBlock, YouTubeBlock],
                  }),

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
              label: { en: 'Meta Title', fr: 'Titre Meta' },
              localized: true,
              admin: {
                description: {
                  en: 'Override the page title for SEO (optional)',
                  fr: 'Remplacer le titre de la page pour le SEO (optionnel)',
                },
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: { en: 'Meta Description', fr: 'Description Meta' },
              localized: true,
              maxLength: 160,
              admin: {
                description: {
                  en: 'SEO meta description (160 characters max)',
                  fr: 'Description meta SEO (160 caractères max)',
                },
              },
            },
            {
              name: 'metaImage',
              type: 'upload',
              label: { en: 'Meta Image', fr: 'Image Meta' },
              relationTo: 'media',
              admin: {
                description: {
                  en: 'Override featured image for social sharing (optional)',
                  fr: "Remplacer l'image mise en avant pour le partage social (optionnel)",
                },
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
      async ({ data, req }) => {
        // Auto-set author to Eric by default
        if (!data.author) {
          try {
            const { docs: users } = await req.payload.find({
              collection: 'users',
              where: {
                name: { equals: 'Eric' },
              },
              limit: 1,
            })

            if (users.length > 0) {
              data.author = users[0].id
            } else if (req.user) {
              data.author = req.user.id
            }
          } catch (error) {
            if (req.user) {
              data.author = req.user.id
            }
          }
        }

        // Auto-generate slug from title if not provided
        if (data.title && !data.slug) {
          data.slug = generateSlug(data.title)
        }

        // Auto-generate excerpt from first sentence if not provided
        if (!data.excerpt && data.content) {
          const firstSentence = extractFirstSentence(data.content)
          if (firstSentence) {
            data.excerpt = firstSentence
          }
        }

        return data
      },
    ],
  },
}
