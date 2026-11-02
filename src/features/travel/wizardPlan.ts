import { MOCK_PLACES } from '../../data/mockData';
import type { TripWizardData } from '../../types/travel';
import { INITIAL_PLAN, images } from './fixtures';
import { dayCount, isoDate, type ActivePlan } from './model';

export function buildWizardPlan(data: TripWizardData): ActivePlan {
  const start = isoDate(data.startDate);
  const end = isoDate(data.endDate);
  const count = Math.max(1, Math.min(30, dayCount(start, end) || 1));

  const draft: ActivePlan = {
    planningMode: 'ai',
    companionType: data.companionType,
    companionCount: data.companionCount,
    departureTime: data.departureTime,
    returnTime: data.returnTime,
    budgetAmount: data.budgetAmount,
    id: `trip-${data.destination}-${start}`,
    destination: data.destination,
    title: `${data.destination} · ${count} ngày`,
    days: count,
    dates: `${data.startDate} – ${data.endDate}`,
    startDate: start,
    endDate: end,
    coverImage: data.destination.includes('Đà Nẵng')
      ? images.bridge
      : data.destination.includes('Hội An')
      ? images.town
      : data.destination.includes('Đà Lạt')
      ? images.dalatCabin
      : images.hero,
    estimatedCostPerPerson: `${data.budgetAmount.toLocaleString('vi-VN')}đ / người`,
    daysSchedule: Array.from({ length: count }, (_, index) => {
      const sample = data.destination.includes('Đà Nẵng') ? INITIAL_PLAN.daysSchedule[index] : undefined;
      return {
        dayNumber: index + 1,
        title: sample?.title || `Khám phá ngày ${index + 1} tại ${data.destination}`,
        dateText: `Ngày ${index + 1}`,
        dayCost: sample?.dayCost || '~800.000đ',
        items: sample
          ? sample.items.map((i) => ({ ...i }))
          : [
              {
                id: `act-${index}-1`,
                time: '08:30',
                placeName: `Điểm tham quan tiêu biểu ${data.destination}`,
                category: 'Tham quan',
                note: 'Khám phá nét đặc trưng văn hóa và cảnh quan thiên nhiên.',
                cost: '100.000đ',
                duration: '2 giờ',
                image: images.hero,
              },
              {
                id: `act-${index}-2`,
                time: '12:00',
                placeName: `Ẩm thực đặc sản địa phương`,
                category: 'Ẩm thực',
                note: 'Thưởng thức món ngon truyền thống nổi tiếng của vùng miền.',
                cost: '150.000đ',
                duration: '1.5 giờ',
                image: images.food,
              },
              {
                id: `act-${index}-3`,
                time: '15:30',
                placeName: `Dạo chơi & Check-in kỷ niệm`,
                category: 'Check-in',
                note: 'Tận hưởng khoảnh khắc hoàng hôn và chụp ảnh lưu niệm.',
                cost: 'Miễn phí',
                duration: '2 giờ',
                image: images.beach,
              },
            ],
      };
    }),
  };

  return draft;
}

