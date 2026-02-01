import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const articles = [
  {
    title: {
      en: 'Dracula: The Birth of Cinematic Horror',
      fr: 'Dracula : La Naissance de l\'Horreur Cinématographique',
    },
    slug: 'dracula-1931',
    featuredImageUrl: 'https://picsum.photos/seed/dracula/1200/800',
    excerpt: {
      en: 'Tod Browning\'s 1931 masterpiece that introduced Bela Lugosi as the iconic Count Dracula, setting the template for vampire films for decades to come.',
      fr: 'Le chef-d\'œuvre de Tod Browning de 1931 qui a présenté Bela Lugosi dans le rôle emblématique du Comte Dracula, établissant le modèle des films de vampires pour les décennies à venir.',
    },
    content: {
      en: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Tod Browning\'s 1931 adaptation of Dracula stands as one of the most influential horror films ever made. Bela Lugosi\'s portrayal of Count Dracula became the definitive interpretation of Bram Stoker\'s vampire.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'A Revolutionary Performance' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Lugosi brought an aristocratic elegance and menacing charm to the role that has never been surpassed. His heavily accented delivery of lines like "I never drink... wine" became iconic.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Gothic Atmosphere' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The film\'s expressionistic lighting and shadowy cinematography created an atmosphere of dread that influenced countless horror films to come.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      fr: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'L\'adaptation de Dracula par Tod Browning en 1931 est l\'un des films d\'horreur les plus influents jamais réalisés. La représentation du Comte Dracula par Bela Lugosi est devenue l\'interprétation définitive du vampire de Bram Stoker.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Une Performance Révolutionnaire' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Lugosi a apporté une élégance aristocratique et un charme menaçant au rôle qui n\'a jamais été surpassé. Sa diction fortement accentuée de phrases comme "Je ne bois jamais... de vin" est devenue iconique.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Atmosphère Gothique' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'L\'éclairage expressionniste du film et sa cinématographie ténébreuse ont créé une atmosphère d\'effroi qui a influencé d\'innombrables films d\'horreur par la suite.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    status: 'published',
    publishedDate: '1931-02-14',
  },
  {
    title: {
      en: 'Frankenstein: The Monster with a Soul',
      fr: 'Frankenstein : Le Monstre avec une Âme',
    },
    slug: 'frankenstein-1931',
    featuredImageUrl: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?w=1200&q=80',
    excerpt: {
      en: 'James Whale\'s 1931 classic transformed Mary Shelley\'s novel into a visual masterpiece, with Boris Karloff\'s iconic creature becoming the face of Universal horror.',
      fr: 'Le classique de James Whale de 1931 a transformé le roman de Mary Shelley en chef-d\'œuvre visuel, la créature emblématique de Boris Karloff devenant le visage de l\'horreur Universal.',
    },
    content: {
      en: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'James Whale\'s Frankenstein redefined horror cinema in 1931. Boris Karloff\'s portrayal of the Monster combined physical menace with heartbreaking pathos.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Karloff\'s Masterpiece' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Beneath Jack Pierce\'s revolutionary makeup, Karloff brought surprising depth to the Monster. His performance made audiences sympathize with the creature despite his horrific appearance.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Visual Innovation' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The laboratory creation sequence, with its crackling electrical equipment and dramatic lighting, remains one of cinema\'s most memorable scenes.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      fr: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Le Frankenstein de James Whale a redéfini le cinéma d\'horreur en 1931. La représentation du Monstre par Boris Karloff combinait menace physique et pathétique déchirant.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Le Chef-d\'œuvre de Karloff' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Sous le maquillage révolutionnaire de Jack Pierce, Karloff a apporté une profondeur surprenante au Monstre. Sa performance a fait sympathiser le public avec la créature malgré son apparence horrifique.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Innovation Visuelle' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'La séquence de création en laboratoire, avec son équipement électrique crépitant et son éclairage dramatique, reste l\'une des scènes les plus mémorables du cinéma.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    status: 'published',
    publishedDate: '1931-11-21',
  },
  {
    title: {
      en: 'The Mummy: Ancient Evil Awakens',
      fr: 'La Momie : Le Mal Ancien se Réveille',
    },
    slug: 'the-mummy-1932',
    featuredImageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80',
    excerpt: {
      en: 'Karl Freund\'s 1932 film brought ancient Egyptian horror to life, with Boris Karloff delivering a mesmerizing performance as the undead priest Imhotep.',
      fr: 'Le film de Karl Freund de 1932 a donné vie à l\'horreur égyptienne ancienne, avec Boris Karloff offrant une performance envoûtante en tant que prêtre mort-vivant Imhotep.',
    },
    content: {
      en: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The Mummy introduced audiences to a new kind of monster - one driven by ancient obsession and eternal love. Karl Freund\'s atmospheric direction created a unique blend of horror and romance.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Karloff\'s Transformation' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Boris Karloff\'s portrayal of Imhotep was radically different from his Monster in Frankenstein. Here, he brought a sophisticated menace and tragic romanticism to the role.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Egyptian Mysticism' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The film\'s use of Egyptian mythology and ancient curses tapped into the public\'s fascination with Egyptology, creating a horror that felt both exotic and timeless.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      fr: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'La Momie a présenté au public un nouveau type de monstre - un être animé par une obsession ancienne et un amour éternel. La direction atmosphérique de Karl Freund a créé un mélange unique d\'horreur et de romance.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'La Transformation de Karloff' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'La représentation d\'Imhotep par Boris Karloff était radicalement différente de son Monstre dans Frankenstein. Ici, il a apporté une menace sophistiquée et un romantisme tragique au rôle.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Mysticisme Égyptien' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'L\'utilisation par le film de la mythologie égyptienne et des malédictions anciennes a exploité la fascination du public pour l\'égyptologie, créant une horreur à la fois exotique et intemporelle.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    status: 'published',
    publishedDate: '1932-12-22',
  },
  {
    title: {
      en: 'The Wolf Man: Curse of the Full Moon',
      fr: 'L\'Homme-Loup : La Malédiction de la Pleine Lune',
    },
    slug: 'the-wolf-man-1941',
    featuredImageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&q=80',
    excerpt: {
      en: 'George Waggner\'s 1941 lycanthrope tale featuring Lon Chaney Jr. created the definitive werewolf mythology that persists in popular culture today.',
      fr: 'Le conte de lycanthrope de George Waggner de 1941 avec Lon Chaney Jr. a créé la mythologie du loup-garou définitive qui persiste dans la culture populaire aujourd\'hui.',
    },
    content: {
      en: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The Wolf Man established the werewolf mythology that became standard: the full moon transformation, silver bullets, and the pentagram mark. Lon Chaney Jr. brought tremendous sympathy to Larry Talbot.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Tragic Hero' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Unlike other Universal monsters, the Wolf Man was purely a victim. Chaney\'s performance emphasized the horror of losing control and becoming a beast against one\'s will.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Transformation Effects' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Jack Pierce\'s transformation makeup, filmed in stop-motion with Chaney holding painful positions, created one of the most memorable effects sequences in classic horror.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      fr: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'L\'Homme-Loup a établi la mythologie du loup-garou devenue standard : la transformation à la pleine lune, les balles d\'argent, et la marque du pentagramme. Lon Chaney Jr. a apporté une immense sympathie à Larry Talbot.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Héros Tragique' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Contrairement aux autres monstres Universal, l\'Homme-Loup était purement une victime. La performance de Chaney soulignait l\'horreur de perdre le contrôle et de devenir une bête contre sa volonté.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Effets de Transformation' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Le maquillage de transformation de Jack Pierce, filmé en stop-motion avec Chaney maintenant des positions douloureuses, a créé l\'une des séquences d\'effets les plus mémorables de l\'horreur classique.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    status: 'published',
    publishedDate: '1941-12-12',
  },
  {
    title: {
      en: 'Creature from the Black Lagoon: The Last Classic Monster',
      fr: 'L\'Étrange Créature du Lac Noir : Le Dernier Monstre Classique',
    },
    slug: 'creature-from-the-black-lagoon-1954',
    featuredImageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    excerpt: {
      en: 'Jack Arnold\'s 1954 3D masterpiece introduced the Gill-man, the last of Universal\'s iconic monsters, in a tale that blended science fiction with gothic horror.',
      fr: 'Le chef-d\'œuvre 3D de Jack Arnold de 1954 a présenté le Gill-man, le dernier des monstres iconiques d\'Universal, dans un conte qui mélangeait science-fiction et horreur gothique.',
    },
    content: {
      en: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The Creature from the Black Lagoon marked the end of an era - the last great monster created by Universal Studios. Shot in 3D, it brought prehistoric terror to the atomic age.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Beauty and the Beast' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The underwater ballet between the Creature and Kay Lawrence became one of cinema\'s most iconic scenes, suggesting a strange beauty in the monster\'s obsession.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Underwater Innovation' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The film\'s extensive underwater photography was groundbreaking, creating an alien world beneath the lagoon\'s surface where the Creature was both predator and victim.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      fr: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'L\'Étrange Créature du Lac Noir a marqué la fin d\'une époque - le dernier grand monstre créé par Universal Studios. Tourné en 3D, il a apporté la terreur préhistorique à l\'ère atomique.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'La Belle et la Bête' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Le ballet sous-marin entre la Créature et Kay Lawrence est devenu l\'une des scènes les plus iconiques du cinéma, suggérant une beauté étrange dans l\'obsession du monstre.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Innovation Sous-marine' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'La photographie sous-marine extensive du film était révolutionnaire, créant un monde alien sous la surface du lac où la Créature était à la fois prédateur et victime.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    status: 'published',
    publishedDate: '1954-03-05',
  },
  {
    title: {
      en: 'The Invisible Man: Unseen Terror',
      fr: 'L\'Homme Invisible : Terreur Invisible',
    },
    slug: 'the-invisible-man-1933',
    featuredImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
    excerpt: {
      en: 'James Whale\'s 1933 adaptation of H.G. Wells\' novel featured groundbreaking special effects and Claude Rains\' unforgettable voice performance.',
      fr: 'L\'adaptation du roman de H.G. Wells par James Whale en 1933 présentait des effets spéciaux révolutionnaires et la performance vocale inoubliable de Claude Rains.',
    },
    content: {
      en: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The Invisible Man showcased special effects that were decades ahead of their time. Claude Rains delivered a tour-de-force performance despite being unseen for most of the film.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Revolutionary Effects' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'John P. Fulton\'s invisibility effects remain impressive today. The scene of Griffin unwrapping his bandages to reveal... nothing, still has the power to amaze.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      fr: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'L\'Homme Invisible présentait des effets spéciaux qui avaient des décennies d\'avance sur leur temps. Claude Rains a livré une performance magistrale malgré son invisibilité pendant la majeure partie du film.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Effets Révolutionnaires' }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Les effets d\'invisibilité de John P. Fulton restent impressionnants aujourd\'hui. La scène de Griffin déroulant ses bandages pour ne rien révéler a toujours le pouvoir d\'étonner.',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    featured: false,
    status: 'published',
    publishedDate: '1933-11-13',
  },
]

async function seed() {
  console.log('🌱 Seeding articles...')

  const payload = await getPayload({ config })

  // Delete all existing articles first
  console.log('🗑️  Deleting existing articles...')
  const { docs: existingArticles } = await payload.find({
    collection: 'articles',
    limit: 1000,
  })

  for (const article of existingArticles) {
    await payload.delete({
      collection: 'articles',
      id: article.id,
    })
  }
  console.log(`🗑️  Deleted ${existingArticles.length} existing articles`)

  // Find the "Universal Films" category (all these articles are Universal classics)
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: 'films-universal' },
    },
    locale: 'fr',
    limit: 1,
  })

  let categoryId: number | string
  if (categories.length > 0) {
    categoryId = categories[0].id
    console.log(`📁 Using existing category: ${categories[0].name}`)
  } else {
    // Create Universal Films category if it doesn't exist
    const newCategory = await payload.create({
      collection: 'categories',
      data: {
        name: 'Films Universal',
        slug: 'films-universal',
        description: 'Articles sur les films Universal',
        order: 1,
      },
      locale: 'fr',
    })

    // Add English translation
    await payload.update({
      collection: 'categories',
      id: newCategory.id,
      data: {
        name: 'Universal Films',
        slug: 'universal-films',
        description: 'Articles about Universal films',
      },
      locale: 'en',
    })

    categoryId = newCategory.id
    console.log('📁 Created category: Universal Films / Films Universal')
  }

  // Get first user
  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (users.length === 0) {
    console.error('❌ No users found. Please create a user first.')
    process.exit(1)
  }

  const authorId: number | string = users[0].id
  console.log(`👤 Using author: ${users[0].email}`)

  for (const article of articles) {
    try {
      let featuredImageId: number | string | undefined

      // Download and upload featured image if URL is provided
      if ('featuredImageUrl' in article && article.featuredImageUrl) {
        try {
          console.log(`📸 Downloading image for ${article.title.en}...`)
          const imageResponse = await fetch(article.featuredImageUrl)
          const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())

          // Create a file object compatible with Payload
          const filename = `${article.slug}.jpg`
          const file = {
            data: imageBuffer,
            mimetype: 'image/jpeg',
            name: filename,
            size: imageBuffer.length,
          }

          // Upload to media collection
          const uploadedImage = await payload.create({
            collection: 'media',
            data: {
              alt: article.title.en,
            },
            file: file as any,
          })

          featuredImageId = uploadedImage.id
          console.log(`✅ Uploaded image for ${article.title.en}`)
        } catch (imageError) {
          console.error(`⚠️  Failed to upload image for ${article.title.en}:`, imageError)
        }
      }

      // Create English version
      const created = await payload.create({
        collection: 'articles',
        data: {
          title: article.title.en,
          slug: article.slug,
          excerpt: article.excerpt.en,
          content: article.content.en as any,
          featured: article.featured,
          status: article.status as any,
          publishedDate: article.publishedDate,
          category: categoryId as any,
          author: authorId as any,
          ...(featuredImageId && { featuredImage: featuredImageId }),
        } as any,
        locale: 'en',
      })

      // Update with French version (include category and author to prevent validation errors)
      await payload.update({
        collection: 'articles',
        id: created.id,
        data: {
          title: article.title.fr,
          slug: article.slug,
          excerpt: article.excerpt.fr,
          content: article.content.fr as any,
          category: categoryId as any,
          author: authorId as any,
        },
        locale: 'fr',
      })

      console.log(`✅ Created: ${article.title.en}`)
    } catch (error: any) {
      console.error(`❌ Error creating ${article.title.en}:`)
      if (error.data?.errors) {
        console.error('Validation errors:', JSON.stringify(error.data.errors, null, 2))
      }
    }
  }

  console.log('✨ Seeding complete!')
  process.exit(0)
}

seed()
