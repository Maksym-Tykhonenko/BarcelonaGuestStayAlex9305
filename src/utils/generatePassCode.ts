export function generatePassCode(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `BGS-${digits}`;
}

export function generateReservationCode(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `GRH-${digits}`;
}
