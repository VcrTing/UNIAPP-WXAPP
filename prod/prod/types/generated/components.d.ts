import type { Schema, Struct } from '@strapi/strapi';

export interface DicsContact extends Struct.ComponentSchema {
  collectionName: 'components_dics_contacts';
  info: {
    displayName: 'Contact';
    icon: 'user';
  };
  attributes: {
    age: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<18>;
    avatarUrl: Schema.Attribute.Text;
    gender: Schema.Attribute.Integer;
    nickName: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    socialAccount: Schema.Attribute.String;
  };
}

export interface SwiperGallery extends Struct.ComponentSchema {
  collectionName: 'components_swiper_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'landscape';
  };
  attributes: {
    belongId: Schema.Attribute.String;
    h: Schema.Attribute.Decimal;
    isSex: Schema.Attribute.Integer;
    url: Schema.Attribute.Text;
    w: Schema.Attribute.Decimal;
  };
}

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

export interface TagTag extends Struct.ComponentSchema {
  collectionName: 'components_tag_tags';
  info: {
    displayName: 'Tag';
    icon: 'attachment';
  };
  attributes: {
    clazz: Schema.Attribute.String;
    cover: Schema.Attribute.Text;
    dataStatus: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    handsome: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'dics.contact': DicsContact;
      'swiper.gallery': SwiperGallery;
      'swiper.swiper': SwiperSwiper;
      'tag.tag': TagTag;
    }
  }
}
