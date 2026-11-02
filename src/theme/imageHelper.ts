import { ImageSourcePropType } from 'react-native';
import { LocalImages } from '../assets/images';

export const resolveImageSource = (img: any): ImageSourcePropType => {
  if (!img) {
    return LocalImages.vietnamHero;
  }
  if (typeof img === 'number') {
    return img;
  }
  if (typeof img === 'object' && img !== null && 'uri' in img) {
    return img as ImageSourcePropType;
  }
  if (typeof img === 'string') {
    if (img.startsWith('http://') || img.startsWith('https://')) {
      return { uri: img };
    }
    const lower = img.toLowerCase();
    if (lower.includes('vietnam') || lower.includes('hero')) return LocalImages.vietnamHero;
    if (lower.includes('bridge') || lower.includes('danang') || lower.includes('bana')) return LocalImages.bridge;
    if (lower.includes('town') || lower.includes('hoian')) return LocalImages.town;
    if (lower.includes('dalat') || lower.includes('cabin')) return LocalImages.dalatCabin;
    if (lower.includes('beach') || lower.includes('biển')) return LocalImages.beach;
    if (lower.includes('bay') || lower.includes('vịnh') || lower.includes('ninhbinh')) return LocalImages.bay;
    if (lower.includes('food') || lower.includes('ăn')) return LocalImages.food;
    if (lower.includes('room2')) return LocalImages.room2;
    if (lower.includes('room')) return LocalImages.room;
    if (lower.includes('resort')) return LocalImages.resort;
    return { uri: img };
  }
  return LocalImages.vietnamHero;
};

