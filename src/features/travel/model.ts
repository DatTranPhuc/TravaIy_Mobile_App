import type { TripDayItem, TripPlan } from '../../types/travel';

export type GeoPoint = { lat: number; lng: number };
export type Stay = {
  id: string;
  name: string;
  area: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  gallery: string[];
  location: GeoPoint;
  amenities: string[];
  description: string;
};
export type LocatedItem = TripDayItem & { location?: GeoPoint; locked?: boolean };
export type ActivePlan = Omit<TripPlan, 'daysSchedule'> & {
  planningMode?: 'ai' | 'manual';
  placeSelection?: string[];
  placesChosen?: boolean;
  companionType?: 'solo' | 'group';
  companionCount?: number;
  departureTime?: string;
  returnTime?: string;
  budgetAmount?: number;
  stayId?: string;
  stayRoomCount?: number;
  hotelBudgetPerNight?: number;
  startDate?: string;
  endDate?: string;
  checkIn?: string;
  checkOut?: string;
  daysSchedule: (Omit<TripPlan['daysSchedule'][number], 'items'> & { items: LocatedItem[] })[];
};
export type PhotoMoment = {
  id: string;
  tripId: string;
  src: string;
  title: string;
  region: string;
  date: string;
  location?: GeoPoint;
  isSample?: boolean;
  createdAt?: string;
  placeId?: string;
  frameId?: string;
  trashedAt?: string;
};

export const distanceKm = (a: GeoPoint, b: GeoPoint) => {
  const rad = Math.PI / 180;
  const dlat = (b.lat - a.lat) * rad;
  const dlng = (b.lng - a.lng) * rad;
  const s = Math.sin(dlat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dlng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
};

export function routeDistance(items: LocatedItem[], anchor: GeoPoint): number {
  const points = [anchor, ...items.flatMap((i) => (i.location ? [i.location] : [])), anchor];
  return points.slice(1).reduce((sum, p, i) => sum + distanceKm(points[i], p), 0);
}

export function isoDate(value: string = ''): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : '';
}

export function dayCount(start: string, end: string) {
  const a = Date.parse(isoDate(start) + 'T12:00:00Z');
  const b = Date.parse(isoDate(end) + 'T12:00:00Z');
  return Number.isFinite(a) && Number.isFinite(b) ? Math.round((b - a) / 86400000) + 1 : 0;
}

