import dayjs from 'dayjs'
import ch from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale(ch)
dayjs.extend(relativeTime)

export { dayjs }
