export const errorInputClasses =
  'border-red-400 focus:border-red-400  focus:ring-red-400'

export const badgeStatusColor = (status) => {
  switch (status) {
    case 'nueva':
      return 'bg-blue-100 text-blue-600'
    case 'en desarrollo':
      return 'bg-yellow-100 text-yellow-600'
    case 'en revisión':
      return 'bg-orange-100 text-orange-600'
    case 'culminada':
      return 'bg-green-100 text-green-600'
    default:
      return ''
  }
}

export const badgeTaskStatusColor = (status) => {
  switch (status) {
    case 'asignada':
      return 'bg-blue-100 text-blue-600'
    case 'en_desarrollo':
      return 'bg-yellow-100 text-yellow-600'
    case 'en_revision':
      return 'bg-orange-100 text-orange-600'
    case 'aceptada':
      return 'bg-green-100 text-green-600'
    default:
      return ''
  }
}
