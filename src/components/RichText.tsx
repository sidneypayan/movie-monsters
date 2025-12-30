import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { JSXConvertersFunction, RichText as RichTextRenderer } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

// Custom renderers for blocks
const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    'image-gallery': ({ node }: { node: any }) => {
      const { images, columns } = node.fields as any
      return (
        <div className={`grid grid-cols-${columns} gap-4 my-8`}>
          {images?.map((img: any, index: number) => {
            const image = typeof img.image === 'object' ? img.image : null
            if (!image) return null

            return (
              <div key={index} className="space-y-2">
                <Image
                  src={image.url}
                  alt={image.alt || img.caption || ''}
                  width={image.width || 800}
                  height={image.height || 600}
                  className="w-full h-auto rounded"
                />
                {img.caption && (
                  <p className="text-sm text-gray-600 text-center">{img.caption}</p>
                )}
              </div>
            )
          })}
        </div>
      )
    },
    youtube: ({ node }: { node: any }) => {
      const { videoId, caption } = node.fields as any
      return (
        <div className="my-8">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded"
            />
          </div>
          {caption && (
            <p className="text-sm text-gray-600 text-center mt-2">{caption}</p>
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
    <div className="prose">
      <RichTextRenderer
        data={content}
        converters={jsxConverters}
      />
    </div>
  )
}
