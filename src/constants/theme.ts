'use client'

import { Button, createTheme, rem } from '@mantine/core'

import { inter } from './fonts'

export const theme = createTheme({
   fontFamily: inter.style.fontFamily,
   headings: {
      sizes: {
         h1: {
            fontSize: rem(32)
         },
         h2: {
            fontSize: rem(24)
         },
         h3: {
            fontSize: rem(20)
         }
      }
   },
   colors: {
      blue: [
         '#faecff',
         '#ecd7f9',
         '#d5adee',
         '#bd81e3',
         '#a95bda',
         '#9c43d4',
         '#9534D2',
         '#8228bb',
         '#7422a7',
         '#651a94'
      ]
   },
   components: {
      Button: Button.extend({
         defaultProps: {
            size: 'md',
            radius: 16,
            pt: 16,
            pb: 16,
            h: 'auto'
         }
      })
   }
})
