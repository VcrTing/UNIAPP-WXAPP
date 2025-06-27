import type { Schema, Struct } from '@strapi/strapi';

export interface SwiperSwiper extends Struct.ComponentSchema {
  collectionName: 'components_swiper_swipers';
  info: {
    displayName: 'Swiper';
    icon: 'chartBubble';
  };
  attributes: {
    h: Schema.Attribute.Decimal;
    isGallery: Schema.Attribute.Integer;
    isSex: Schema.Attribute.Integer;
    mediaType: Schema.Attribute.Integer;
    url: Schema.Attribute.Text;
    w: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'swiper.swiper': SwiperSwiper;
    }
  }
}
