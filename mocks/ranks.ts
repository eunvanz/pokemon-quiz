import { Rank } from '@/lib/types'

const rank: Rank = {
  id: 16,
  name: '용도리',
  country: 'South Korea',
  city: 'Seoul',
  countryCode: 'KR',
  ip: '124.49.186.43',
  generation: 0,
  score: 92077,
  gotcha: 29,
  maxCombo: 3,
  avgSpeed: 24.1,
  maxSpeed: 38.2,
  accuracy: 80.57,
  gotchaMons: [
    9, 219, 323, 392, 426, 714, 557, 192, 493, 93, 56, 237, 233, 54, 570, 200,
    150, 123, 131, 88, 133, 92, 29, 178, 119, 474, 264, 595, 614,
  ],
  seq: 4,
}

const mockRanks = {
  rank,
}

export default mockRanks
