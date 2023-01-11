export const TRANSACTION_STATUS = index => {
  const status = [
    'Cancelled',
    'InProgress',
    'Reviewing',
    'Completed'
  ]
  return status[index]
}