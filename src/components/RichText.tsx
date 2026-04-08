import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { JSXConvertersFunction, RichText as RichTextRenderer } from '@payloadcms/richtext-lexical/react'
import ImageGalleryClient from './ImageGalleryClient'
import SingleImageClient from './SingleImageClient'

interface GalleryData {
  images?: any[] | null
  columns?: '2' | '3' | '4' | null
}

// Factory that creates converters with gallery data injected
const createConverters = (gallery?: GalleryData | null): JSXConvertersFunction =>
  ({ defaultConverters }) => ({
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
      gallery: () => {
        if (!gallery?.images || gallery.images.length === 0) return null

        const galleryImages = gallery.images
          .map((img: any) => {
            const image = typeof img === 'object' ? img : null
            if (!image) return null
            return {
              url: image.url,
              alt: image.alt || '',
              width: image.width || 800,
              height: image.height || 600,
            }
          })
          .filter((img): img is NonNullable<typeof img> => img !== null)

        if (galleryImages.length === 0) return null

        return (
          <ImageGalleryClient
            images={galleryImages}
            columns={gallery.columns || '3'}
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
  gallery?: GalleryData | null
}

export default function RichText({ content, gallery }: RichTextProps) {
  return (
    <div className="prose-img:max-w-4xl prose-img:mx-auto prose-img:w-4/5">
      <RichTextRenderer
        data={content}
        converters={createConverters(gallery)}
      />
    </div>
  )
}
