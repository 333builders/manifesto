import dayjs from 'dayjs'

export default function DateDiff({date} : {date: string}) {

    const diff = Math.abs(dayjs(date).diff(Date.now(), "d"))

    if(diff >= 730) {
        return <>{Math.abs(dayjs(date).diff(Date.now(), "y"))} years</>
    }

    if(diff >= 365) {
        return <>{Math.abs(dayjs(date).diff(Date.now(), "y"))} year</>
    }

    if(diff >= 62) {
        return <>{Math.abs(dayjs(date).diff(Date.now(), "month"))} months</>
    }

    if(diff >= 31) {
        return <>{Math.abs(dayjs(date).diff(Date.now(), "month"))} month</>
    }

    if(diff >= 14) {
        return <>{Math.abs(dayjs(date).diff(Date.now(), "week"))} weeks</>
    }

    if(diff >= 7) {
        return <>{Math.abs(dayjs(date).diff(Date.now(), "week"))} week</>
    }

    if(diff >= 2) {
        return <>{Math.abs(dayjs(date).diff(Date.now(), "d"))} days</>
    }

    if(diff >= 1) {
        return <>Yesterday</>
    }

    return <>Today</>
  }