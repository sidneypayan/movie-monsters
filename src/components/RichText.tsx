import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { JSXConvertersFunction, RichText as RichTextRenderer } from '@payloadcms/richtext-lexical/react'
import ImageGalleryClient from './ImageGalleryClient'
import SingleImageClient from './SingleImageClient'

// Custom renderers for blocks
const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    image: ({ node }: { node: any }) => {
      const { image, caption, width } = node.fields as any
      const imageData = typeof image === 'object' ? image : null
      if (!imageData) return null

      const widthClasses = {
        full: 'w-4/5 mx-auto',
        large: 'w-3/5 mx-auto',
        medium: 'w-2/5 mx-auto',
        small: 'w-1/3 mx-auto',
      }

      return (
        <SingleImageClient
          url={imageData.url}
          alt={imageData.alt || caption || ''}
          caption={caption}
          width={imageData.width || 800}
          height={imageData.height || 600}
          widthClass={widthClasses[width as keyof typeof widthClasses] || widthClasses.full}
        />
      )
    },
    'image-gallery': ({ node }: { node: any }) => {
      const { images, columns } = node.fields as any

      // Prepare images for the gallery
      const galleryImages = images?.map((img: any) => {
        const image = typeof img.image === 'object' ? img.image : null
        if (!image) return null

        return {
          url: image.url,
          alt: image.alt || img.caption || '',
          caption: img.caption,
          width: image.width || 800,
          height: image.height || 600,
        }
      }).filter(Boolean) || []

      if (galleryImages.length === 0) return null

      return (
        <ImageGalleryClient
          images={galleryImages}
          columns={columns || '3'}
        />
      )
    },
    youtube: ({ node }: { node: any }) => {
      const { videoId, caption } = node.fields as any
      return (
        <div className="my-10">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-accent-red/20 hover:border-accent-red/40 transition-all duration-300">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          {caption && (
            <p className="text-sm text-text-secondary text-center mt-3 font-light italic">{caption}</p>
          )}
        </div>
      )
    },
  },
})

interface RichTextProps {
  content: SerializedEditorState
}

export default function RichText({ content }: RichTextProps) {
  return (
    <div className="prose prose-img:max-w-4xl prose-img:mx-auto prose-img:w-4/5">
      <RichTextRenderer
        data={content}
        converters={jsxConverters}
      />
    </div>
  )
}
