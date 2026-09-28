export const reservationProgressOptions = [
  { value: 'reserved', label: '예약 완료' },
  { value: 'called', label: '예약 확인 전화 완료' },
  { value: 'unanswered', label: '예약 확인 전화 부재중' },
  { value: 'attended', label: '참석 완료' },
  { value: 'no_show', label: '노쇼' },
] as const;
